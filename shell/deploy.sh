#!/bin/bash

set -e

export ENVIRONMENT
export JEKYLL_ENV
export S3BUCKET_NAME

AWS_S3_BUCKET="s3://${S3BUCKET_NAME}"
./shell/build.sh

aws s3 sync ./public/ $AWS_S3_BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete
