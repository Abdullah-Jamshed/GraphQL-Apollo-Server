const { gql } = require("apollo-server");

const userSchema = require("./user");
const messageSchema = require("./message");

const linkSchema = gql`
  union Search = Message | User

  type Message {
    _: Boolean
  }

  type User {
    _: Boolean
  }

  type Query {
    _: Boolean
    search(contain: String): [Search]
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, messageSchema];
