const { gql, ApolloServer } = require("apollo-server");
const models = require("./db/models");
const { resolver } = require("graphql-sequelize");
const { createContext, EXPECTED_OPTIONS_KEY } = require("dataloader-sequelize");
const rabbitmq = require("./mq/rabbitmq");
const { buildFederatedSchema } = require("@apollo/federation");

const MQ_CHANNEL_NAME = process.env.MQ_CHANNEL_NAME || "default";
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    user(id: ID!): user
    users: [user]
  }

  type user {
    id: ID!
    name: String!
    email: String!
    phone: String!
    country: String!
    rewards: [userReward]
  }

  type userReward {
    id: ID!
    userId: ID
    rewardId: ID
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phone: String!
      country: String!
    ): user!
  }
`;

const resolvers = {
  Query: {
    user: resolver(models.user),
    users: resolver(models.user),
  },

  user: {
    rewards: resolver(models.user.rewards, {
      before: function(options) {
        options.include = [models.user];
        return options;
      },
    }),
  },

  Mutation: {
    async createUser(root, args, context) {
      const { name, email, phone, country } = args;
      return models.user.create({ name, email, phone, country });
    },
  },
};

resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  context() {
    const dataloaderContext = createContext(models.sequelize);
    return {
      [EXPECTED_OPTIONS_KEY]: dataloaderContext,
    };
  },
});

rabbitmq.then((channel) => {
  channel.consume(
    MQ_CHANNEL_NAME,
    async function(msg) {
      try {
        console.log("user reward taken!");

        const tempUserReward = JSON.parse(msg.content.toString());
        console.log(tempUserReward);

        await models.userReward.create(tempUserReward);

        channel.ack(msg);
      } catch (err) {
        console.log(err);
      }
    },
    {
      noAck: false,
    }
  );
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
