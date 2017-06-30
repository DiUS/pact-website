#!/bin/bash

set -e

docker run -v $(pwd)/.:/app node:8.1-alpine  /bin/ash -c '
cd /app
# javascript stuff
npm i grunt-cli
npm i
bower install

# bundle javascript assets
./node_modules/grunt-cli/bin/grunt bundle
'
