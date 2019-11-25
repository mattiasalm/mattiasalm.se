#!/usr/bin/env bash

trimStr() {
    while read data; do
        echo $data | sed -e 's/^[ \t]*//g' -e ':a;N;$!ba;s/\n//g' | tr -d '\n\r'
    done
}

echo -en "\e[1m\e[32m Building...\e[0m"

start=$(perl -MTime::HiRes=time -e 'printf "%.9f\n", time')

rm -rf dist
mkdir -p dist/content

cat src/styles/*.css | postcss -u autoprefixer cssnano postcss-css-variables --no-map -o dist/main.min.css
terser src/scripts/*.js -o dist/main.min.js -c -m --mangle-props 'keep_quoted'

for file in src/content/*; do
    local fileName=$(basename "$file")
    echo $(cat "$file" | trimStr) > dist/content/$fileName
done

content=$(<dist/content/index.html)
echo $(cat src/index.html | postcss --syntax postcss-html -u autoprefixer cssnano postcss-css-variables --no-map | trimStr | sed 's|<div id="content">|&'$content'|g') > dist/index.html

end=$(perl -MTime::HiRes=time -e 'printf "%.9f\n", time')
timing=$(printf "%0.2f\n" $((end-start)))

echo -e "\e[1m\e[32mdone!\e[0m ("$timing"s)"