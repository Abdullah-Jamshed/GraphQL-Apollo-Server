const users = require("../data/users");

const userResolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.find(({ id: userId }) => userId === Number(id)),
    me: (parent, args, { me }) => me,
  },

  Mutation: {
    createUser: (parent, { firstName, lastName, email, password }) => {
      users.push({ id: users.length + 1, firstName, lastName, email, password, messageIds: [] });
      return users.slice(-1)[0];
    },
  },
};

module.exports = userResolvers;
