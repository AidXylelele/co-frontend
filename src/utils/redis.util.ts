import { Redis } from "ioredis";
import { ParseUtil } from "./parse.utils";
import { Collection } from "src/types/common.types";
import { RedisChannels, RedisCollection } from "src/types/redis.types";

export class RedisUtils extends ParseUtil {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;

  constructor(sub: Redis, pub: Redis, templates: RedisCollection) {
    super();
    this.sub = sub;
    this.pub = pub;
    this._init(templates);
  }

  generateChannels(pattern: string, templates: RedisCollection) {
    const result: RedisCollection = {};
    const entries = Object.entries(templates);
    for (const [key, value] of entries) {
      const filled: Collection<string> = {};
      for (const item in value) {
        const template = value[item];
        filled[item] = pattern + template;
      }
      result[key] = filled;
    }
    return result;
  }

  setChannels(templates: RedisCollection) {
    const requests = this.generateChannels("req", templates);
    const responses = this.generateChannels("res", templates);
    this.channels = { requests, responses };
  }

  private async _init(templates: RedisCollection) {
    const subscriptions = [];
    this.setChannels(templates);
    const allChannelTypes = Object.values(this.channels);
    for (const channelType of allChannelTypes) {
      for (const channels in channelType) {
        const values = Object.values(channelType[channels]);
        for (const value of values) {
          const subscription = this.subscribe(value);
          subscriptions.push(subscription);
        }
      }
    }
    await Promise.all(subscriptions);
  }

  async publish(channel: string, data: any) {
    const message = this.stringify(data);
    await this.pub.publish(channel, message);
  }

  async subscribe(channel: string) {
    await this.sub.subscribe(channel);
  }

  private isError(channel: string): boolean {
    const { error } = this.channels.responses;
    return Object.values(error).includes(channel);
  }

  handleMessage<T>(neededChannel: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.sub.on("message", (channel, message) => {
        if (channel === neededChannel) {
          const parsedMessage = this.parse(message);
          resolve(parsedMessage);
        } else if (this.isError(channel)) {
          reject(message);
        }
      });

      this.sub.on("error", (error) => {
        reject(error);
      });
    });
  }
}
