# Virgo

## URL Format

```
https://<ENDPOINT>/<TOKEN>?op=<OP>&url=<URL>&...
```

`ENDPOINT` is the bucket static hosting endpoint.

`TOKEN` is generated server-side by taking the HMAC-SHA1 of the query string and signing it with your `SECRET_KEY`.

`OP` is the operation you want to perform. Available options are `resize` and `crop`

`URL` is the image URL you want to perform the operation on.

## Options

### Resize

Required: `width`, `height`  
Optional: `quality`

### Crop

Required: `width`, `height`  
Optional: `quality`

-----

## Example

```
TODO
```
