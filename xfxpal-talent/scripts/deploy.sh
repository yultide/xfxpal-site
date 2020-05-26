#!/bin/bash

PROJECT_DIR=$(dirname $(dirname $0))
cd $PROJECT_DIR
echo "Building project $PWD"
git checkout .
git reset --hard HEAD
git pull
yarn install
yarn sync
yarn build
