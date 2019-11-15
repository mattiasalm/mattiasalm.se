#!/usr/bin/env bash

rm -rf dist
mkdir -p dist/styles
mkdir -p dist/scripts
minify src/index.html > dist/index.html
minify src/styles/*.css > dist/styles/main.css
minify src/scripts/*.js > dist/scripts/main.js
cp -R src/content dist/content