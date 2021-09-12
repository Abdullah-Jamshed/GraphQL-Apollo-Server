const { gql } = require("apollo-server");

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
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }
`;

module.exports = typeDefs;
