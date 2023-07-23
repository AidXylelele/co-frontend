import { Redis } from "ioredis";
import { UserService } from "../services/user.service";
import { userChannels } from "src/consts/redis.consts";
import { RedisCollection } from "src/types/redis.types";
import { ControllerUtils } from "src/utils/controller.utils";
import { RegisterRequest, LoginRequest } from "src/types/express.types";

export class UserController extends ControllerUtils {
  public sub: Redis;
  public pub: Redis;
  public service: UserService;

  constructor(sub: Redis, pub: Redis) {
    super();
    this.service = new UserService(sub, pub, userChannels);
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
