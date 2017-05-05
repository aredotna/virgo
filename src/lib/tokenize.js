const HmacSHA1 = require('crypto-js/hmac-sha1');
const { SECRET_KEY } = process.env;

module.exports = (x) =>
  HmacSHA1(x, SECRET_KEY).toString();
