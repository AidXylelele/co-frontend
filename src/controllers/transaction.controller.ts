import { Redis } from "ioredis";
import { RedisChannels } from "src/types/app.types";
import { Deposit, Withdraw } from "src/types/input.types";
import { TransactionService } from "src/services/transaction.service";
import { transactionChannels } from "src/consts/redis.consts";
import { ApprovalRequest } from "src/types/express.types";

export class TransactionController {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;
  public service: TransactionService;

  constructor(sub: Redis, pub: Redis) {
    this.channels = transactionChannels;
    this.service = new TransactionService(sub, pub, this.channels);
  }

  async createDeposit(input: Deposit) {
    return await this.service.createDeposit(input);
  }

  async executeDeposit(req: ApprovalRequest) {
    const paymentData = req.query;
    await this.service.executeDeposit(paymentData);
  }

  async createWithdraw(input: Withdraw) {
    return await this.service.createWithdraw(input);
  }
}
