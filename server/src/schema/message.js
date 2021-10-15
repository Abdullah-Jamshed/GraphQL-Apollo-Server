const { gql } = require("apollo-server");

const message = gql`
  extend type Query {
    message(id: ID!): Message
    messages: [Message!]!
    books: [Book!]!
  }

  interface Book {
    title: String!
    author: String!
  }

  type TextBook implements Book {
    title: String!
    author: String!
    course: String!
  }

  type ColoringBook implements Book {
    title: String!
    author: String!
    color: String!
  }

  directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION
  directive @upper(if: Boolean! = true) on FIELD_DEFINITION

  extend type Message {
    id: ID! @deprecated(reason: "New field id")
    text(upper: Boolean = true): String! @upper
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
