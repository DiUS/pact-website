#!/bin/bash

set -e

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
    curl --basic -u api_user:hvyuVplCKDXJdD4p5ap6UyE7 -g https://user-admin.dius.com.au/api/users > _data/active_people.json
    jekyll build --trace --incremental --future --unpublished
    ;;
esac
