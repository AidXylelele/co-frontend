import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/app.types";
import { Login, Registration } from "src/types/input.types";

export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async register(input: Registration) {
    this.publish(this.channels.register, input);
    return await this.handleMessage(this.channels.login);
  }

  async login(input: Login) {
    this.publish(this.channels.login, input);
    return await this.handleMessage(this.channels.login);
  }

  async deposit(input: any) {

  }
}
