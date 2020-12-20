const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const PORT = process.env.PORT || 4000;

const USER_SERVICE =
  process.env.SERVICE_USER_HOST + ":" + process.env.SERVICE_USER_PORT ||
  "http://localhost:3001";

const REWARD_SERVICE =
  process.env.SERVICE_REWARD_HOST + ":" + process.env.SERVICE_REWARD_PORT ||
  "http://localhost:3002";

const server = new ApolloServer({
  gateway: new ApolloGateway({
    serviceList: [
      { name: "userService", url: USER_SERVICE },
      { name: "rewardService", url: REWARD_SERVICE },
    ],
  }),
  subscriptions: false,
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
