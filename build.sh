#!/usr/bin/env bash

if hash minify 2>/dev/null; then
    echo -e "\e[1m\e[32m Building...\e[0m"
    rm -rf dist
    mkdir -p dist
    minify src/index.html > dist/index.html
    minify src/styles/*.css > dist/main.css
    minify src/scripts/*.js > dist/main.js
    cp -R src/content dist/content
else
    echo -e "\e[1m\e[31m minify not installed\n\n run \e[0m\e[7m\e[1m npm i -g minify \e[0m"
fi
