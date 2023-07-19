import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/redis.types";
import { Login, Registration } from "src/types/auth.types";


export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async register(input: Registration) {
    const { login, register } = this.channels.auth;
    await this.publish(register, input);
    const response = await this.handleMessage(login);
    return response;
  }

  async login(input: Login) {
    const { login } = this.channels.auth;
    await this.publish(login, input);
    const response = await this.handleMessage(login);
    return response;
  }
}
