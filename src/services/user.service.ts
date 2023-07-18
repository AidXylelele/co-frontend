import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/app.types";
import { Deposit, Login, Registration } from "src/types/input.types";

export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async register(input: Registration) {
    const { login, register } = this.channels.auth;
    await this.publish(register, input);
    return await this.handleMessage(login);
  }

  async login(input: Login) {
    const { login } = this.channels.auth;
    await this.publish(login, input);
    return await this.handleMessage(login);
  }

  async deposit(input: Deposit) {
    const { create, approve } = this.channels.deposit;
    await this.publish(create, input);
    await this.handleMessage(create);
  }
}
