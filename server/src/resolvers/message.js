const users = require("../data/users");
const messages = require("../data/messages");
const books = require("../data/books");

const messageResolvers = {
  Query: {
    message: (parent, { id }) => messages.find((message) => message.id === Number(id)),
    messages: () => messages,
    books: () => books,
  },

  Book: {
    __resolveType(obj) {
      if (obj.course) {
        return "TextBook";
      }
      if (obj.color) {
        return "ColoringBook";
      }
      return null;
    },
  },

  Mutation: {
    createMessage: (parent, { input: { text } }, { me }) => {
      messages.push({ id: messages.length + 1, text, userId: me.id });
      me.messageIds.push(messages.length + 1);
      return messages.slice(-1)[0];
    },

    deleteMessage: (parent, { id }) => {
      const index = messages.findIndex((message) => message.id === Number(id));
      if (index < 0) return false;
      messages.splice(index, 1);
      return true;
    },

    updateMessage: (parent, { id, text }) => {
      const index = messages.findIndex((message) => message.id === Number(id));
      if (index < 0) return false;
      messages[index]["text"] = text;
      return true;
    },
  },

  Message: {
    user: (message) => users.find((user) => user.id === Number(message.userId)),
  },
};

module.exports = messageResolvers;
