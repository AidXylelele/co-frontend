import { Redis } from "ioredis";
import { userChannels } from "src/consts/redis.consts";
import { PassportData } from "src/types/auth.types";
import { RedisChannels } from "src/types/app.types";
import { BalanceService } from "src/services/balance.service";
import { ControllerUtils } from "src/utils/controller.utils";

export class BalanceController extends ControllerUtils {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;
  public service: BalanceService;

  constructor(sub: Redis, pub: Redis) {
    super();
    this.channels = userChannels;
    this.service = new BalanceService(sub, pub, this.channels);
  }

  async check(input: PassportData) {
    const { email } = input;
    const response = await this.service.check(email);
    return response;
  }
}
