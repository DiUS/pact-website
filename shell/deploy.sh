#!/bin/bash

set -e

export ENVIRONMENT
export JEKYLL_ENV

if [ "${ENVIRONMENT}" == "dev" ]; then
  AWS_S3_BUCKET="s3://staging.pactflow.io"
else
  AWS_S3_BUCKET="s3://pactflow.io"
fi

./shell/build.sh

aws s3 sync ./public/ $AWS_S3_BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete
