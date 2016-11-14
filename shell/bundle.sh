#!/bin/bash

set -e

# javascript stuff
npm i grunt-cli
npm i
bower install

# bundle javascript assets
./node_modules/grunt-cli/bin/grunt bundle
