const { ApolloServer } = require("apollo-server");

// DATA
const users = require("./data/users");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const indexNumber = (source) => Math.round(Math.random() * (source.length - 1));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    me: users[indexNumber(users)],
  },
});

server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
