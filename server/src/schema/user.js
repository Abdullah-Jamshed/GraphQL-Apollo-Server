const { gql } = require("apollo-server");

const user = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    messageIds: [ID!]
  }

  extend type Mutation {
    createUser(firstName: String, lastName: String, email: String, password: String): User
  }
`;

module.exports = user;
