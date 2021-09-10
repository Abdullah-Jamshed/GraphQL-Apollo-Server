const { ApolloServer, gql } = require("apollo-server");

const users = require("./data");

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
  }
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    password: String
  }
`;
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.filter(({ id: userId }) => userId === Number(id))[0],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
