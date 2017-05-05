'use strict';

const parse = require('./lib/parse');
const render = require('./lib/render');
const resize = require('./lib/resize');
const validateToken = require('./lib/validate_token');

const prep = (key) => {
  const options = parse(key);
  const { token, path } = options;

  if (validateToken(token, path)) {
    return Promise.resolve(options);
  } else {
    return Promise.reject(new Error(`[BadRequest] Validation error: malformed token <${token}>`));
  }
};

module.exports.exec = (event, context, callback) => {
  prep(event.queryStringParameters.key)
    .then(options => {
      switch (options.op) {
        case 'resize':
          return resize(options);
          break;

        default:
          const err = new Error(`[BadRequest] Required param <op> not specified: ${JSON.stringify(options)}`);
          return Promise.reject(err);
          break;
      };
    })

    .then(url => {
      callback(null, render.json(url));
    })

    .catch(err =>
      callback(err)
    );
};

module.exports.debug = (event, context, callback) => {
  prep(event.queryStringParameters.key)
    .then(options =>
      callback(null, render.json(options))
    )

    .catch(err =>
      callback(err)
    );
};
