import { Redis } from "ioredis";
import { Channels } from "src/types/redis.types";
import { RedisUtils } from "../utils/redis.util";

export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: Channels) {
    super(sub, pub, channels);
  }

  async register(data: any) {
    this.publish(this.channels.register, data);
    return await this.handleMessage(this.channels.login);
  }

  async login(data: any) {
    this.publish(this.channels.login, data);
    return await this.handleMessage(this.channels.login);
  }
}
