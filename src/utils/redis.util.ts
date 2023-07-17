import { Redis } from "ioredis";
import { Channels } from "src/types/redis.types";

export class RedisUtils {
  public sub: Redis;
  public pub: Redis;
  public channels: Channels;

  constructor(sub: Redis, pub: Redis, channels: Channels) {
    this.sub = sub;
    this.pub = pub;
    this.channels = channels;
    Object.values(this.channels).forEach(this.subscribe);
  }

  publish(channel: string, data: any) {
    const message = JSON.stringify(data);
    this.pub.publish(channel, message);
  }

  subscribe(channel: string) {
    this.sub.subscribe(channel);
  }

  async handleMessage(neededChannel: string) {
    return new Promise((resolve, reject) => {
      this.sub.on("message", (channel, message) => {
        if (channel === neededChannel) {
          const parsedMessage = JSON.parse(message);
          resolve(parsedMessage);
        } else if (channel === this.channels.error) {
          console.log(message);
        }
      });
      this.sub.on("error", (error) => {
        reject(error);
      });
    });
  }
}
