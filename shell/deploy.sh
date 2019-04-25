#!/bin/bash

set -e

if [ "${ENVIRONMENT}" == "dev" ]; then
  AWS_S3_BUCKET="s3://staging.pactflow.io"
else
  AWS_S3_BUCKET="s3://pactflow.io"
fi

aws s3 sync ./public/ $AWS_S3_BUCKET \
  --acl public-read \
  --cache-control "max-age=1800, s-max-age=1800, must-revalidate" \
  --delete
