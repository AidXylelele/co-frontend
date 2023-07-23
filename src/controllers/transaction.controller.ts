import { Redis } from "ioredis";
import { ApprovalRequest } from "src/types/express.types";
import { ControllerUtils } from "src/utils/controller.utils";
import { Deposit, Withdraw } from "src/types/transaction.types";
import { TransactionService } from "src/services/transaction.service";
import { transactionChannels } from "src/consts/redis.consts";

export class TransactionController extends ControllerUtils {
  public sub: Redis;
  public pub: Redis;
  public service: TransactionService;

  constructor(sub: Redis, pub: Redis) {
    super();
    this.service = new TransactionService(sub, pub, transactionChannels);
  }

  async createDeposit(input: Deposit) {
    const response = await this.service.createDeposit(input);
    return response;
  }

  async executeDeposit(req: ApprovalRequest) {
    const paymentData = req.query;
    await this.service.executeDeposit(paymentData);
  }

  async createWithdraw(input: Withdraw) {
    const response = await this.service.createWithdraw(input);
    return response;
  }
}
