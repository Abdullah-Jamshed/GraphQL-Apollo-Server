const { gql } = require("apollo-server");

const user = gql`
  extend type Query {
    users(gender: Gender): [User!]
    user(id: ID!): User
    me: User
  }

  extend type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    messageIds: [ID!]
    gender: Gender
  }

  enum Gender {
    MALE
    FEMALE
  }

  extend type Mutation {
    createUser(firstName: String, lastName: String, email: String, password: String, gender: Gender): User
  }
`;

module.exports = user;
