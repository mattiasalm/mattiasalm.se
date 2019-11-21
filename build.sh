#!/usr/bin/env bash

if ! hash minify 2>/dev/null; then
    echo -e "\e[1m\e[31m minify not installed\n\n run \e[0m\e[7m\e[1m npm i -g minify \e[0m"
    exit 1
fi

if ! hash terser 2>/dev/null; then
    echo -e "\e[1m\e[31m terser not installed\n\n run \e[0m\e[7m\e[1m npm i -g terser \e[0m"
    exit 1
fi
start=$(perl -MTime::HiRes=time -e 'printf "%.9f\n", time')
echo -en "\e[1m\e[32m Building...\e[0m"
rm -rf dist
mkdir -p dist
postcss src/index.html --syntax postcss-html -u autoprefixer cssnano postcss-css-variables --no-map -o dist/index.html
cat src/styles/*.css | postcss -u autoprefixer cssnano postcss-css-variables --no-map -o dist/main.min.css
terser src/scripts/*.js -o dist/main.min.js -c -m --mangle-props 'keep_quoted'
cp -R src/content dist/content
end=$(perl -MTime::HiRes=time -e 'printf "%.9f\n", time')
timing=$(printf "%0.2f\n" $((end-start)))
echo -e "\e[1m\e[32mdone!\e[0m ("$timing"s)"