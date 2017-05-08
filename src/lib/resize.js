const AWS = require('aws-sdk');
const axios = require('axios');
const Sharp = require('sharp');

const S3 = new AWS.S3;
const { AWS_S3_BUCKET } = process.env;

module.exports = ({ key, url, width, height, quality }) => {
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
        .sharpen()
        .withMetadata()
        .jpeg({
          quality,
          force: false, // Attempt to use input format
        })
        .toBuffer()
    )

    .then(buffer =>
      S3.putObject({
        Body: buffer,
        Bucket: AWS_S3_BUCKET,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
        Key: decodeURIComponent(key),
      }).promise()
    )

    .then(() =>
      `http://${AWS_S3_BUCKET}.s3-website-us-east-1.amazonaws.com/${key}`
    );
};
