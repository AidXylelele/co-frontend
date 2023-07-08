const { CustomError } = require("./customError.util");

class RedisUtil {
  constructor(sub, pub, channels) {
    this.sub = sub;
    this.pub = pub;
    this.channels = channels;

    this.channels.forEach((channel) => this.sub.subscribe(channel));

    this.sub.on("message", this.handleMessage.bind(this));
  }

  publish(channel, message) {
    this.pub.publish(channel, JSON.stringify(message));
  }

  handleMessage(channel, message) {
    const parsedMessage = JSON.parse(message);

    if (this.channels.includes(channel)) {
      const handlerName = `handle${this.capitalize(channel.split(":")[1])}`;
      if (typeof this[handlerName] === "function") {
        this[handlerName](parsedMessage);
      } else {
        throw new CustomError("Redis Util Error", `No handler for ${channel}`);
      }
    }
  }

  capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

module.exports = { RedisUtil };
