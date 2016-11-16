#!/bin/bash

set -ex

env 
# ruby stuff
source ~/.bashrc

# the following commands install jekyll
rvm use 2.3.0
bundle

# build
jekyll clean

case $JEKYLL_ENV in
  production )
    echo 'production build'
    jekyll build --trace --incremental
    ;;
  * )
    echo 'staging build'
    jekyll build --trace --incremental --future --unpublished
    ;;
esac
