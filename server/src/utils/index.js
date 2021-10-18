const jwt = require("jsonwebtoken");

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
    if (data) return data;
    return null;
  } catch {
    return null;
  }
};

module.exports = { getUser };
