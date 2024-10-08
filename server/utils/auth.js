const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token) {
      try {
        const { data } = jwt.verify(token.replace('Bearer ', ''), secret);
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
    }

    return req;
  },
};
