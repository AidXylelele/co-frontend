const { RedisUtils } = require("../utils/redis.util");

class UserService extends RedisUtils {
  constructor(sub, pub, channels) {
    super(sub, pub, channels);
  }

  async register(data) {
    this.publish(this.channels.register, data);
    return await this.handleMessage(this.channels.login);
  }

  async login(data) {
    this.publish(this.channels.login, data);
    return await this.handleMessage(this.channels.login);
  }
}

module.exports = { UserService };
