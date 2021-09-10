const { ApolloServer, gql } = require("apollo-server");

const users = require("./data");

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.find(({ id: userId }) => userId === Number(id)),
    a: (parent, { id }) => {
      return { b: 1 };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
