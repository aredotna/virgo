'use strict';

const render = require('./lib/render');
const resize = require('./lib/resize');

module.exports.exec = (event, context, callback) => {
  const options = event.queryStringParameters;

  switch (options.op) {
    case 'resize':
      resize(options)
        .then(url => {
          callback(null, render.redirect(url));
        })
        .catch(err => {
          callback(err);
        });

      break;

    default:
      callback(new Error(`Required param <op> not specified: ${JSON.stringify(options)}`));

      break;
  };
};

module.exports.event = (event, context, callback) =>
  callback(null, render.json({ event }));
