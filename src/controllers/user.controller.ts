import { Redis } from "ioredis";
import { Channels } from "src/types/redis.types";
import { UserService } from "../services/user.service";
import { userChannels } from "src/consts/redis.consts";

export class UserController {
  public sub: Redis;
  public pub: Redis;
  public channels: Channels;
  public service: UserService;

  constructor(sub: Redis, pub: Redis) {
    this.channels = userChannels;
    this.service = new UserService(sub, pub, this.channels);
  }
  async register(data: any) {
    return await this.service.register(data);
  }

  async login(data: any) {
    return await this.service.login(data);
  }
}
