const { expressjwt: checkJwt } = require("express-jwt");

const auth = checkJwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

module.exports = auth;
