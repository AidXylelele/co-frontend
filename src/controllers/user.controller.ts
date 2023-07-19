import { Redis } from "ioredis";
import { UserService } from "../services/user.service";
import { userChannels } from "src/consts/redis.consts";
import { RedisChannels } from "src/types/app.types";
import { RegisterRequest, LoginRequest } from "src/types/express.types";
import { ControllerUtils } from "src/utils/controller.utils";

export class UserController extends ControllerUtils {
  public sub: Redis;
  public pub: Redis;
  public channels: RedisChannels;
  public service: UserService;

  constructor(sub: Redis, pub: Redis) {
    super();
    this.channels = userChannels;
    this.service = new UserService(sub, pub, this.channels);
  }

  async register(req: RegisterRequest) {
    const { body } = req;
    const response = await this.service.register(body);
    return response;
  }

  async login(req: LoginRequest) {
    const { body } = req;
    const response = await this.service.login(body);
    return response;
  }
}
