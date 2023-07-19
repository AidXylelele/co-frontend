import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/app.types";
import { Deposit, Login, Registration, Withdraw } from "src/types/input.types";
import { LinkResponse } from "src/types/response.types";

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

  async createDeposit(input: Deposit) {
    const { create, approve } = this.channels.deposit;
    await this.publish(create, input);
    const response = await this.handleMessage<LinkResponse>(approve);
    return response;
  }

  async executeDeposit(input: any) {}

  async createWithdraw(input: Withdraw) {
    const { create } = this.channels.withdraw;
    await this.publish(create, input);
  }
}
