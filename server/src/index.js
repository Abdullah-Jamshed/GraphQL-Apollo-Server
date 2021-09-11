const { ApolloServer, gql } = require("apollo-server");

const users = require("./data");

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type Icas {
    user(id: ID!): String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Mutation {
    user(firstName: String, lastName: String, email: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.find(({ id: userId }) => userId === Number(id)),
  },
  Mutation: {
    user: (parent, args) => {
      users.push({
        id: args.id || 564,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
      });
      const usera = users.slice(-1);
      console.log(usera[0]);
      return usera[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
