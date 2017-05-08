# Virgo

[![Build Status](https://travis-ci.org/aredotna/virgo.svg?branch=master)](https://travis-ci.org/aredotna/virgo)

## URL Format

```
https://<ENDPOINT>/<TOKEN>/<OP>/<WIDTH>X<HEIGHT>/<QUALITY>/<URL>
```

`ENDPOINT` is the bucket static hosting endpoint.

`TOKEN` is generated server-side by taking the HMAC-SHA1 of the query string and signing it with your `SECRET_KEY`

`OP` is the operation you want to perform. Available options are `resize` and `crop`

`WIDTH` self-explanatory

`HEIGHT` self-explanatory

`URL` is the image URL you want to perform the operation on. URI encoded.
