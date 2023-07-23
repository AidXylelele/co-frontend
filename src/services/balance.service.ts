import { Redis } from "ioredis";
import { RedisUtils } from "src/utils/redis.util";
import { RedisCollection } from "src/types/redis.types";

export class BalanceService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, templates: RedisCollection) {
    super(sub, pub, templates);
  }

  async check(email: string) {
    const { requests, responses } = this.channels;
    const requestChannel = requests.balance.check;
    const responseChannel = responses.balance.check;
    await this.publish(requestChannel, email);
    const response = await this.handleMessage(responseChannel);
    return response;
  }
}
