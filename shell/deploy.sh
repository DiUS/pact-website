#!/bin/bash

set -e

aws s3 sync ./public/ $AWS_S3_BUCKET \
  --acl public-read \
  --cache-control "max-age=1800, s-max-age=1800, must-revalidate" \
  --delete
