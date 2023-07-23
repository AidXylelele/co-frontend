import { Redis } from "ioredis";
import { RedisUtils } from "../utils/redis.util";
import { RedisCollection } from "src/types/redis.types";
import { Login, Registration } from "src/types/auth.types";

export class UserService extends RedisUtils {
  constructor(sub: Redis, pub: Redis, templates: RedisCollection) {
    super(sub, pub, templates);
  }

  async register(input: Registration) {
    const { requests, responses } = this.channels;
    const { register } = requests.auth;
    const { login } = responses.auth;
    await this.publish(register, input);
    const response = await this.handleMessage(login);
    return response;
  }

  async login(input: Login) {
    const { requests, responses } = this.channels;
    const requestChannel = requests.auth.login;
    const responseChannel = responses.auth.login;
    await this.publish(requestChannel, input);
    const response = await this.handleMessage(responseChannel);
    return response;
  }
}
