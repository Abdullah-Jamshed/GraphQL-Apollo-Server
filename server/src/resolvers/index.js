const userResolvers = require("./user");
const messageResolvers = require("./message");

const messages = require("../data/messages.json");
const users = require("../data/users.json");

const indexResolvers = {
  Search: {
    __resolveType(obj) {
      if (obj.text) {
        return "Message";
      }
      if (obj.firstName) {
        return "User";
      }
      return null;
    },
  },

  Query: {
    search: () => {
      return [
        {
          firstName: "sxs",
        },
        {
          firstName: "ds",
        },
        {
          text: "sdf",
        },
      ];
    },
  },
};

module.exports = [indexResolvers, userResolvers, messageResolvers];
