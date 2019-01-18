#!/bin/bash

set -e

docker run -v $(pwd)/.:/app node:8.1-alpine  /bin/ash -c '
apk update && apk upgrade && apk add --no-cache bash git openssh
cd /app
# javascript stuff
npm i grunt-cli
npm i
./node_modules/bower/bin/bower install --allow-root

# bundle javascript assets
./node_modules/grunt-cli/bin/grunt bundle
'
