const users = require("../data/users");
const { emailScalar } = require("../directives/scalar");

const userResolvers = {
  // Gender: {
  //   MALE: "blue",
  //   FEMALE: "pink",
  // },

  Email: emailScalar,

  Query: {
    users: (_parent, { gender }) => {
      if (gender) return users.filter(({ gender: gen }) => gen === gender);
      return users;
    },
    user: (parent, { id }) => users.find(({ id: userId }) => userId === Number(id)),
    me: (parent, args, { me }) => me,
  },

  Mutation: {
    createUser: (parent, { firstName, lastName, email, password, gender }) => {
      users.push({ id: users.length + 1, firstName, lastName, email, password, gender, messageIds: [] });
      return users.slice(-1)[0];
    },
  },
};

module.exports = userResolvers;
