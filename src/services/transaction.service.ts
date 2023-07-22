import { Redis } from "ioredis";
import {
  Deposit,
  Withdraw,
  LinkResponse,
  ApprovalQueries,
} from "src/types/transaction.types";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/redis.types";

export class TransactionService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async createDeposit(input: Deposit) {
    const { create, approve } = this.channels.deposit;
    const createChannels = this.generateChannels(create);
    const approveChannels = this.generateChannels(approve);
    await this.publish(createChannels.requestChannel, input);
    const response = await this.handleMessage<LinkResponse>(
      approveChannels.responseChannel
    );
    return response;
  }

  async executeDeposit(input: ApprovalQueries) {
    const { execute } = this.channels.deposit;
    const { requestChannel } = this.generateChannels(execute);
    await this.publish(requestChannel, input);
  }

  async createWithdraw(input: Withdraw) {
    const { create } = this.channels.withdraw;
    const { requestChannel } = this.generateChannels(create);
    await this.publish(requestChannel, input);
  }
}
