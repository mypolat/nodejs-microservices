const { gql, ApolloServer } = require("apollo-server");
const { resolver } = require("graphql-sequelize");
const { createContext, EXPECTED_OPTIONS_KEY } = require("dataloader-sequelize");
const models = require("./db/models");
const { buildFederatedSchema } = require("@apollo/federation");

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    reward(id: ID!): reward
    rewards: [reward]
  }

  type reward {
    id: ID!
    name: String!
    amount: Int!
    expiryDate: String!
    users: [userReward]
  }

  type userReward {
    id: ID!
    userId: ID
    rewardId: ID
  }

  type Mutation {
    createReward(
      name: String!
      amount: Int!
      expiryDate: String!
    ): reward!

    assignRewardToUser(
      userId: ID!
      rewardId: ID!
    ): userReward!
  }
`;

const resolvers = {
  Query: {
    reward: resolver(models.reward),
    rewards: resolver(models.reward),
  },

  reward: {
    users: resolver(models.reward.users, {
      before: function (options) {
        options.include = [models.reward];
        return options;
      },
    }),
  },

  Mutation: {
    async createReward(root, args, context) {
      const { name, amount, expiryDate } = args;
      return models.reward.create({ name, amount, expiryDate });
    },

    async assignRewardToUser(root, args, context) {
      const { userId, rewardId } = args;
      return models.userReward.create({ userId, rewardId });
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

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});