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
    messageIds: [ID!]
  }

  type Mutation {
    createUser(firstName: String, lastName: String, email: String, password: String): User
    createMessage(text: String): Message
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
    createUser: (parent, { firstName, lastName, email, password }) => {
      users.push({ id: users.length + 1, firstName, lastName, email, password, messageIds: [] });
      return users.slice(-1)[0];
    },
    createMessage: (parent, { text }, { me }) => {
      messages.push({ id: messages.length + 1, text, userId: me.id });
      me.messageIds = [...me.messageIds, messages.length + 1];
      console.log(me.messageIds);
      return messages.slice(-1)[0];
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
