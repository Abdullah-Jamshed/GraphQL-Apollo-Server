const { GraphQLScalarType, Kind, GraphQLError } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const validateEmail = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (typeof value !== "string") {
    throw new GraphQLError(`value is not string ${value}`);
  }
  if (!re.test(value)) {
    throw new GraphQLError(`value is not a valid email ${value}`);
  }
  return value;
};

const emailScalar = new GraphQLScalarType({
  name: "Email",
  description: "Email custom scalar type",
  serialize: validateEmail,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`can only parse string as email only but got ${ast.kind}`);
    }
    return validateEmail(ast.value);
  },
});

module.exports = { dateScalar, emailScalar };
