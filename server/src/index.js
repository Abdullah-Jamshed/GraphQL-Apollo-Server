const { ApolloServer, gql } = require("apollo-server");

const users = require("./data/users");
const messages = require("./data/messages");

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    message(id: ID!): Message
    messages: [Message!]!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
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
    me: (parent, args, { me }) => me,
    message: (parent, { id }) => messages.find((message) => message.id === Number(id)),
    messages: () => messages,
  },

  Mutation: {
    user: (parent, args) => {
      users.push({ id: users.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password });
      return users.slice(-1)[0];
    },
  },
  Message: {
    user: (message) => users.find((user) => user.id === Number(message.userId)),
  },
};

const indexNumber = (source) => Math.round(Math.random() * (source.length - 1));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    me: users[indexNumber(users)],
  },
});

server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
