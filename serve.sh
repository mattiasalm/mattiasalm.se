#!/usr/bin/env bash

if ! hash superstatic 2>/dev/null; then
    echo -e "\e[1m\e[31m superstatic not installed\n\n run \e[0m\e[7m\e[1m npm i -g superstatic \e[0m"
    exit 1
fi

if ! hash onchange 2>/dev/null; then
    echo -e "\e[1m\e[31m onchange not installed\n\n run \e[0m\e[7m\e[1m npm i -g onchange \e[0m"
    exit 1
fi

zsh build.sh &&
echo -e "\e[1m\e[33m Watching folders for changes...\e[0m" &
onchange -d 1000 'src/**/*.*' -- zsh build.sh &
echo -e "\e[1m\e[33m Starting server...\e[0m" &
superstatic dist --port 8080 --host 127.0.0.1 &
wait
