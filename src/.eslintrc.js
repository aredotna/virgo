module.exports = {
  'env': {
    'browser': false,
    'es6': true,
    'node': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
  },
};