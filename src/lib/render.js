module.exports.json = body => ({
  statusCode: '200',
  body: JSON.stringify(body),
});

module.exports.redirect = url => ({
  statusCode: '301',
  headers: {
    'location': url,
  },
  body: '',
});
