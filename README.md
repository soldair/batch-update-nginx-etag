# batch-update-nginx-etag
set file mtime to content based etag value with nginx-etag

```sh
npm install -g batch-update-nginx-etag

nginx-etag --path ./ --filter '.js$'
```

this provides a command that sets the modified time of all matching files to the value of the first 32 bits of it's md5 sum.

## why

nginx builds the etag from the file's mtime and the number of bytes. if you serve the same static files from a distributed set of nginx servers the mtime has to match or your users will download content they already have.

