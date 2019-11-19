#!/usr/bin/env bash

if hash onchange 2>/dev/null; then
    echo -e "\e[1m\e[33m Watching folders for changes...\e[0m"
    onchange -d 1000 'src/**/*.*' -- zsh build.sh
else
    echo -e "\e[1m\e[31m onchange not installed\n\n run \e[0m\e[7m\e[1m npm i -g onchange \e[0m"
fi
