import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisChannels } from "src/types/redis.types";
import { Login, Registration } from "src/types/auth.types";

export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, channels: RedisChannels) {
    super(sub, pub, channels);
  }

  async register(input: Registration) {
    const { login, register } = this.channels.auth;
    const registerChannels = this.generateChannels(register);
    const loginChannels = this.generateChannels(login);
    await this.publish(registerChannels.requestChannel, input);
    const response = await this.handleMessage(loginChannels.responseChannel);
    return response;
  }

  async login(input: Login) {
    const { login } = this.channels.auth;
    const { requestChannel, responseChannel } = this.generateChannels(login);
    await this.publish(requestChannel, input);
    const response = await this.handleMessage(responseChannel);
    return response;
  }
}
