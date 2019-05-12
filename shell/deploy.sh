#!/bin/bash

set -e

if [ "${ENVIRONMENT}" == "dev" ]; then
  AWS_S3_BUCKET="s3://staging.pactflow.io"
else
  AWS_S3_BUCKET="s3://pactflow.io"
fi

export JEKYLL_VERSION=3.8
docker run --rm \
  --user root \
  -e JEKYLL_ENV=${ENVIRONMENT} \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  bash -c 'ls -al; chown -R jekyll:jekyll /srv/jekyll && jekyll doctor && jekyll build'

aws s3 sync ./public/ $AWS_S3_BUCKET \
  --acl public-read \
  --cache-control "max-age=60, s-max-age=60, must-revalidate" \
  --delete
