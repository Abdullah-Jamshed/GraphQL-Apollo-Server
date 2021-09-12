const { gql } = require("apollo-server");

const message = gql`
extend type Query {
    message(id: ID!): Message
    messages: [Message!]!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  extend type Mutation {
    createMessage(text: String): Message
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }
`;

module.exports = message;
