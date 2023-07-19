import { Redis } from "ioredis";
import { RedisUtils } from "src/utils/redis.util";
import { RedisChannels } from "src/types/app.types";

export class BalanceService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async check(email: string) {
    const { check } = this.channels.balance;
    await this.publish(check, email);
    const response = await this.handleMessage(check);
    return response;
  }
}
