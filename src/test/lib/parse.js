const parse = require('../../lib/parse');

describe('parse', () => {
  it('parses the key', () => {
    parse('8f03b74b6c4215e31440e19e8452ed48909a8d56/resize/200x200/90/http://example.com/example/example.png')
      .should.eql({
        key: '8f03b74b6c4215e31440e19e8452ed48909a8d56/resize/200x200/90/http%3A%2F%2Fexample.com%2Fexample%2Fexample.png',
        token: '8f03b74b6c4215e31440e19e8452ed48909a8d56',
        op: 'resize',
        width: 200,
        height: 200,
        quality: 90,
        url: 'http://example.com/example/example.png'
      });
  });
});
