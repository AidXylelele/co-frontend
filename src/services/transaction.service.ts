import { Redis } from "ioredis";
import {
  Deposit,
  Withdraw,
  LinkResponse,
  ApprovalQueries,
} from "src/types/transaction.types";
import { RedisUtils } from "../utils/redis.util";
import { RedisCollection } from "src/types/redis.types";

export class TransactionService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, templates: RedisCollection) {
    super(sub, pub, templates);
  }

  async createDeposit(input: Deposit) {
    const { create } = this.channels.requests.deposit;
    const { approve } = this.channels.responses.deposit;
    await this.publish(create, input);
    const response = await this.handleMessage<LinkResponse>(approve);
    return response;
  }

  async executeDeposit(input: ApprovalQueries) {
    const { execute } = this.channels.requests.deposit;
    await this.publish(execute, input);
  }

  async createWithdraw(input: Withdraw) {
    const { create } = this.channels.requests.withdraw;
    await this.publish(create, input);
  }
}
