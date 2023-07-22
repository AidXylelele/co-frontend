import { Redis } from "ioredis";
import { RedisUtils } from "src/utils/redis.util";
import { RedisChannels } from "src/types/redis.types";

export class BalanceService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async check(email: string) {
    const { check } = this.channels.balance;
    const { requestChannel, responseChannel } = this.generateChannels(check);
    await this.publish(requestChannel, email);
    const response = await this.handleMessage(responseChannel);
    return response;
  }
}
