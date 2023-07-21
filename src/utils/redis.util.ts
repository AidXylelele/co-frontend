import { Redis } from "ioredis";
import { ParseUtil } from "./parse.utils";
import { RedisChannels } from "src/types/redis.types";

export class RedisUtils extends ParseUtil {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;

  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super();
    this.sub = sub;
    this.pub = pub;
    this.channels = channels;
    this._init();
  }

  private async _init() {
    const subscriptions = [];
    for (const channel in this.channels) {
      const values = Object.values(this.channels[channel]);
      for (const value of values) {
        const subscription = this.subscribe(value);
        subscriptions.push(subscription);
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
    return Object.values(this.channels.error).includes(channel);
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
