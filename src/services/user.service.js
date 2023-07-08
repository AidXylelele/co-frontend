const { RedisUtils } = require("../utils/redis.util");

class UserService extends RedisUtils {
  constructor(sub, pub, channels) {
    super(sub, pub, channels);
  }
  async register(data) {
    this.publish("user:register", data);
    return await this.handleMessage("user:register");
  }

  async login(data) {
    this.publish("user:login", data);
    return await this.handleMessage("user:login");
  }
}

module.exports = { UserService };
