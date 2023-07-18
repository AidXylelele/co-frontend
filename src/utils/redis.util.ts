import { Redis } from "ioredis";
import { RedisChannels } from "src/types/app.types";

export class RedisUtils {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;

  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    this.sub = sub;
    this.pub = pub;
    this.channels = channels;
    this._init();
  }

  private _init() {
    Object.values(this.channels).forEach((channel) => {
      Object.values(channel).forEach(this.subscribe);
    });
  }

  publish(channel: string, data: any) {
    const message = JSON.stringify(data);
    this.pub.publish(channel, message);
  }

  subscribe(channel: string) {
    this.sub.subscribe(channel);
  }

  private isError(channel: string): boolean {
    return Object.values(this.channels.error).includes(channel);
  }

  async handleMessage(neededChannel: string) {
    return new Promise((resolve, reject) => {
      this.sub.on("message", (channel, message) => {
        if (channel === neededChannel) {
          const parsedMessage = JSON.parse(message);
          resolve(parsedMessage);
        } else if (this.isError(channel)) {
          console.log(message);
        }
      });

      this.sub.on("error", (error) => {
        reject(error);
      });
    });
  }
}
