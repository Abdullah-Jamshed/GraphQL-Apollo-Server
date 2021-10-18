const users = require("../data/users");
const { emailScalar } = require("../directives/scalar");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyPass = async (password, hashPass) => {
  return await bcrypt.compare(password, hashPass);
};

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
    createUser: async (parent, { firstName, lastName, email, password, gender }) => {
      users.push({ id: users.length + 1, firstName, lastName, email, password: await hashPassword(password), gender, messageIds: [] });
      return users.slice(-1)[0];
    },

    loggedIn: async (parent, { email, password }) => {
      const userExists = users.find((user) => user.email === email);
      if (userExists && (await verifyPass(password, userExists.password))) {
        const { password, ...data } = userExists;
        return jwt.sign(data, "secret", { expiresIn: "1h" });
      } else {
        return "username or password is wrong";
      }
    },
  },
};

module.exports = userResolvers;
