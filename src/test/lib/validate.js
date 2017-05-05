const validateToken = require('../../lib/validate_token');
const tokenize = require('../../lib/tokenize');

describe('validateToken', () => {
  it('returns true if the request is valid', () => {
    const path = `resize/200x200/90/http://example.com/example/example.png`
    const token = tokenize(path);
    const key = `${token}/${path}`;

    validateToken(token, key).should.be.true();
  });

  it('returns false if the request is invalid', () => {
    const path = `resize/200x200/90/http://example.com/example/example.png`
    const token = tokenize(path);
    const key = `${token}/${path}`;

    const someOtherToken = tokenize('crop/200x200/90/http://example.com/example/example.png')

    validateToken(someOtherToken, key).should.be.false();
  });
});
