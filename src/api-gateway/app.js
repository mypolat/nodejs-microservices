const { gql, ApolloServer } = require("apollo-server");
const { ApolloGateway }  = require('@apollo/gateway');

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    gateway: new ApolloGateway({
      serviceList: [
        { name: 'userService', url: 'http://localhost:3000/' },
        { name: 'rewardService', url: 'http://localhost:3001/' }
      ]
    }), 
    subscriptions: false
  }); 
  
  server.listen(PORT).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });