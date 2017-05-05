module.exports.json = body => ({
  statusCode: '200',
  contentType: 'application/json',
  body,
});

module.exports.redirect = url => ({
  statusCode: '301',
  headers: {
    'location': url,
  },
  body: '',
});
