#!/usr/bin/env bash

npm run build || exit 1 &&
echo -e "\e[1m\e[33m Watching folders for changes...\e[0m" &
onchange -d 1000 'src/**/*.*' -- npm run build &
echo -e "\e[1m\e[33m Starting server...\e[0m" &
superstatic public --port 8080 --host 127.0.0.1 &
wait
