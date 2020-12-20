const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const PORT = process.env.PORT || 3000;

const USER_SERVICE = process.env.SERVICE_USER_HOST || "http://localhost:3001";
const REWARD_SERVICE = process.env.SERVICE_REWARD_HOST || "http://localhost:3002";

console.log({ USER_SERVICE, REWARD_SERVICE })

const gateway = new ApolloGateway({
  serviceList: [
    { name: "userService", url: USER_SERVICE },
    { name: "rewardService", url: REWARD_SERVICE },
  ],
})

const startServer = async () => {
  try {
    const { schema, executor } = await gateway.load();

    const server = new ApolloServer({ schema, executor });

    server.listen(PORT).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();