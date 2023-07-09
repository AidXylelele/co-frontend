const { userChannels } = require("../consts/redisChannels");
const { UserService } = require("../services/user.service");

class UserController {
  constructor(sub, pub) {
    this.channels = userChannels;
    this.service = new UserService(sub, pub, this.channels);
  }
  async register(data) {
    return await this.service.register(data);
  }

  async login(data) {
    return await this.service.login(data);
  }
}

module.exports = { UserController };
