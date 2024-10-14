#!/usr/bin/env bash

START=$(date +%s);

echo 'rm node_modules'
rm -rf node_modules .yarnclean node_modules_clean
echo 'yarn install'
yarn install --production
echo 'copy node_modules'
cp -R node_modules node_modules_temp
echo 'build'
yarn build
echo 'clean node_modules'
yarn clean:dep
mv node_modules node_modules_clean
mv node_modules_temp node_modules
echo 'docker build'
docker build -t my-evos .
echo 'finish'

END=$(date +%s);
echo $((END-START)) | awk '{print int($1/60)":"int($1%60)}'