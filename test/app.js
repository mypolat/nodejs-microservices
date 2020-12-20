const { makeExecutableSchema } = require("@graphql-tools/schema");
const { addMocksToSchema } = require("@graphql-tools/mock");
const { graphql } = require("graphql");

const schemaString = `
   type user {
    id: ID!
    name: String!
    email: String!
    phone: String!
    country: String!
    rewards: [userReward]
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

  type RootQuery {
    user(id: ID!): user
    users: [user]
    reward(id: ID!): reward
    rewards: [reward]
  }

  schema {
    query: RootQuery 
  }
`;

const schema = makeExecutableSchema({ typeDefs: schemaString });
const schemaWithMocks = addMocksToSchema({ schema });

const query = `
query allQueryList {
    user(id: 1) { id, name, email, phone, country }
    user(id: 1) { id, name, email, phone, country, rewards { id, rewardId } }
    users { id, name, email, phone, country }
    users { id, name, email, phone, country, rewards { id, rewardId } }
    reward(id: 1) { id, name, amount, expiryDate }
    reward(id: 1) { id, name, amount, expiryDate, users { id, userId } }
    rewards { id, name, amount, expiryDate }
    rewards { id, name, amount, expiryDate, users { id, userId } }
}
`;

graphql(schemaWithMocks, query).then((result) =>
  console.log("Got result", result)
);
