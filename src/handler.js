'use strict';

const parser = require('./lib/parser');
const render = require('./lib/render');
const resize = require('./lib/resize');
const tokenize = require('./lib/tokenize');
const validateToken = require('./lib/validate_token');

const prep = (key) => {
  const options = parser.parse(key);
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
        default: {
          const err = new Error(`[BadRequest] Required param <op> not specified: ${JSON.stringify(options)}`);
          return Promise.reject(err);
        }
      }
    })

    .then(url => {
      cb(null, render.redirect(url));
    })

    .catch(err =>
      cb(err)
    );
};

module.exports.sign = (e, ctx, cb) => {
  const url = e.queryStringParameters.key.replace(parser.stem, '');
  const encoded = encodeURIComponent(url);
  const key = e.queryStringParameters.key.replace(url, encoded);
  cb(null, render.redirect(tokenize(key)));
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
