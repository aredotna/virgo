module.exports = x => {
  let url = decodeURIComponent(x);

  if (!/^http(s?):\/\//.test(url)) {
    url = `http://${url}`;
  }

  return url;
};
