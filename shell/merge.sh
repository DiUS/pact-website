#!/bin/bash

set -e

git checkout $PROD_BRANCH
git pull origin $PROD_BRANCH
git merge origin/$DEPLOY_BRANCH
git push origin $PROD_BRANCH
