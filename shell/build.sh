#!/bin/bash

set -ex

docker run -v $(pwd)/.:/app -e JEKYLL_ENV=${JEKYLL_ENV} ruby:2.3-alpine  /bin/ash -c '
apk add --update --no-cache build-base
cd /app
bundle

# build
jekyll clean

case ${JEKYLL_ENV} in
  production )
    echo "production build"
    jekyll build --trace --incremental
    ;;
  * )
    echo "staging build"
    jekyll build --trace --incremental --future --unpublished
    ;;
esac
'
