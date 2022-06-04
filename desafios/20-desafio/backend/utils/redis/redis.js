const {
  RedisFunctionFlags,
} = require("@redis/client/dist/lib/commands/generic-transformers");
let redis = require("redis");
class Redis {
  static connect;

  constructor() {
    if (Redis.connect) {
      return Redis.connect;
    }
    this.client = redis.createClient({
      host: "127.0.0.1",
      port: 6379,
    });
    Redis.connect = this.client;
  }

  async connect() {
    await this.event();
    await this.client();
  }

  async events() {
    this.client.on("connect", async () => {
      console.log("Sirviendo con Redis");
    });

    this.client.on("error", async () => {
      console.log("Error de Conexión de Redis");
    });
  }
}

module.exports = new Redis();
