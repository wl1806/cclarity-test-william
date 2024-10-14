#!/usr/bin/env bash

yarn autoclean --init
yarn autoclean --force

yarn add -g modclean
modclean --patterns="default:safe,default:caution" -r

rm -rf node_modules/rxjs/src/
rm -rf node_modules/rxjs/bundles/
rm -rf node_modules/rxjs/_esm5/
rm -rf node_modules/rxjs/_esm2015/
rm -rf node_modules/rxjs/node_modules/
rm -rf node_modules/moment/src
rm -rf node_modules/moment/node_modules
rm -rf node_modules/@babel/plugin-*
rm -rf node_modules/@babel/template
rm -rf node_modules/sharp
rm -rf node_modules/@types
rm -rf node_modules/terser-webpack-plugin/node_modules
rm -rf node_modules/string.prototype.trimstart/node_modules
rm -rf node_modules/string.prototype.trimend/node_modules
rm -rf node_modules/side-channel/node_modules
rm -rf node_modules/style-loader/node_modules
rm -rf node_modules/react-dom/node_modules
rm -rf node_modules/csso/node_modules