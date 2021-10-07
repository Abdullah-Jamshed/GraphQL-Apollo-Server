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

server.listen({ port: 8080 }).then(({ url }) => console.log(`🚀 GraphQL server running at ${url}`));

// SERVER SETUP WITH  *** apollo-server-express ***

// const { ApolloServer } = require("apollo-server-express");
// const app = require("express")();

// const typeDefs = require("./schema");
// const resolvers = require("./resolvers");

// const startApolloServer = async (typeDefs, resolvers) => {
//   const server = new ApolloServer({ typeDefs, resolvers });
//   await server.start();

//   server.applyMiddleware({ app });

//   // Modified server startup
//   await new Promise((resolve) => app.listen({ port: 8080 }, resolve));
//   console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
// };

// startApolloServer(typeDefs, resolvers);
