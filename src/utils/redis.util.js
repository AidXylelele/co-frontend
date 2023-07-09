class RedisUtils {
  constructor(sub, pub, channels) {
    this.sub = sub;
    this.pub = pub;
    this.channels = channels;
    Object.values(this.channel).forEach(this.subscribe);
  }

  publish(channel, data) {
    const message = JSON.stringify(data);
    this.pub.publish(channel, message);
  }

  subscribe(channel) {
    this.sub.subscribe(channel);
  }

  async handleMessage(neededChannel) {
    return new Promise((resolve, reject) => {
      this.sub.on("message", (channel, message) => {
        if (channel === neededChannel) {
          const parsedMessage = JSON.parse(message);
          resolve(parsedMessage);
        }
      });
      this.sub.on("error", (error) => {
        reject(error);
      });
    });
  }
}

module.exports = { RedisUtils };
