const tokenize = require('./tokenize');

module.exports = (token, key) => {
  const path = key.replace(`${token}/`, '');
  return token === tokenize(path);
};
