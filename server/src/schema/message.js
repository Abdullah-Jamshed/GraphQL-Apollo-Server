const { gql } = require("apollo-server");

const message = gql`
  extend type Query {
    message(id: ID!): Message
    messages: [Message!]!
  }

  directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION

  type Message {
    id: ID! @deprecated(reason: "New field id")
    text: String!
    user: User!
  }

  input TextInput {
    text: String!
  }

  extend type Mutation {
    createMessage(input: TextInput): Message
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }
`;

module.exports = message;
