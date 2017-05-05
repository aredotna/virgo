module.exports = (input) => {
  const parts = input.split('/');

  const token = parts[0];
  const op = parts[1];
  const dimensions = parts[2].split('x');
  const width = parseInt(dimensions[0], 10);
  const height = parseInt(dimensions[1], 10);
  const quality = parseInt(parts[3], 10);
  const url = parts.slice(4).join('/');

  const key = [
    token,
    op,
    [
      width,
      height,
    ].join('x'),
    quality,
    encodeURIComponent(url),
  ].join('/');

  const path = key
    .split('/')
    .slice(1)
    .join('/');

  return {
    key,
    path,
    token,
    op,
    width,
    height,
    quality,
    url,
  };
};
