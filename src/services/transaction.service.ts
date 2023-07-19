import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { LinkResponse } from "src/types/response.types";
import { RedisChannels } from "src/types/app.types";
import { ApprovalQueries, Deposit, Withdraw } from "src/types/input.types";

export class TransactionService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async createDeposit(input: Deposit) {
    const { create, approve } = this.channels.deposit;
    await this.publish(create, input);
    const response = await this.handleMessage<LinkResponse>(approve);
    return response;
  }

  async executeDeposit(input: ApprovalQueries) {
    const { execute } = this.channels.deposit;
    await this.publish(execute, input);
    const response = await this.handleMessage<any>(execute);
    return response;
  }

  async createWithdraw(input: Withdraw) {
    const { create } = this.channels.withdraw;
    await this.publish(create, input);
  }
}