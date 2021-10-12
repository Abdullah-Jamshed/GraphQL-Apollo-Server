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
    search: (_, { contain }, info) => {
      function searchFunc(arr, contain) {
        return arr.filter((obj) => {
          var flag = false;
          Object.keys(obj).find((key) => {
            if (String(obj[key]).search(contain) >= 0) {
              flag = true;
              return true;
            }
          });
          return flag;
        });
      }
      var res1 = searchFunc(messages, contain);
      var res2 = searchFunc(users, contain);
      return [...res1, ...res2];
    },
  },
};

module.exports = [indexResolvers, userResolvers, messageResolvers];
