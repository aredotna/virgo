'use strict';

const parse = require('./lib/parse');
const render = require('./lib/render');
const resize = require('./lib/resize');
const tokenize = require('./lib/tokenize');
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

module.exports.exec = (e, ctx, cb) => {
  prep(e.queryStringParameters.key)
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
      cb(null, render.json(url));
    })

    .catch(err =>
      cb(err)
    );
};

module.exports.sign = (e, ctx, cb) => {
  cb(null, render.json(tokenize(e.queryStringParameters.key)))
};

module.exports.debug = (e, ctx, cb) => {
  prep(e.queryStringParameters.key)
    .then(options =>
      cb(null, render.json(options))
    )

    .catch(err =>
      cb(err)
    );
};

module.exports.event = (e, ctx, cb) => {
  cb(null, render.json(e));
};
