const jwt = require("jsonwebtoken");

const users = require("../data/users.json");

// const getUser = (token) => {
//   const data = jwt.verify(token, "secret", (err, decoded) => {
//     console.log("decoded ===>>> ", decoded);
//     if (decoded) {
//       return decoded;
//     }
//     return null;
//   });
//   return data;
// };

const getUser = (token) => {
  try {
    const data = jwt.verify(token, "secret");
    if (data) {
      return users.find((user) => user.id === data.id) || null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = { getUser };
