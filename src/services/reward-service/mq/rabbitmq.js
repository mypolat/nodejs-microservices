const amqp = require("amqplib/callback_api");

const MQ_HOST = process.env.MQ_HOST || "amqp://localhost";
const MQ_CHANNEL_NAME = process.env.MQ_CHANNEL_NAME || "default";

module.exports = new Promise((resolve, reject) => {
  amqp.connect(MQ_HOST, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(MQ_CHANNEL_NAME, {
        durable: true,
      });

      resolve(channel);
    });
    
    process.on("exit", () => {
      connection.close();
    });
  });
});
