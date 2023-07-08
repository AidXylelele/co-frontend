const { RedisUtil } = require("../utils/redis.util");

const userChannels = ["user:login", "user:register"];

class UserService extends RedisUtil {
  constructor(sub, pub, channels) {
    super(sub, pub, channels);
  }
  register(message) {
    this.publish("user:register", message);
  }

  login(message) {
    this.publish("user:login", message);
  }

  handleRegister(parsedMessage) {
    return parsedMessage;
  }

  handleLogin(parsedMessage) {
    return parsedMessage;
  }
}

const userService = new UserService(userChannels);

module.exports = { userService };
