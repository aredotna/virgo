const AWS = require('aws-sdk');
const crypto = require('crypto');
const axios = require('axios');
const Sharp = require('sharp');

const decode = require('./decode');

const S3 = new AWS.S3();
const bucket = process.env.AWS_S3_BUCKET;

module.exports = (options) => {
  // TODO: params check/validation

  const url = decode(options.url);

  const digest = crypto
    .createHash('sha1')
    .update(JSON.stringify(options))
    .digest('hex');

  const key = `processed/${digest}`;

  const width = parseInt(options.width, 10);
  const height = parseInt(options.height, 10);
  const quality = options.quality || 90;

  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })

    .then(({ data }) =>
      Sharp(data)
        .resize(width, height)
        .max()
        .withoutEnlargement()
        .rotate()
        .quality(quality)
        .sharpen()
        .withMetadata()
        .toFormat('jpeg')
        .toBuffer()
    )

    .then(buffer =>
      S3.putObject({
        Body: buffer,
        Bucket: bucket,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
        Key: key,
      }).promise()
    )

    .then(() =>
      `https://${bucket}.s3.amazonaws.com/${key}`
    );
};
