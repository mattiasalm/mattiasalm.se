#!/usr/bin/env bash

if ! hash now 2>/dev/null; then
    echo -e "\e[1m\e[31m now not installed\n\n run \e[0m\e[7m\e[1m npm i -g now \e[0m"
    exit 1
fi

echo -e "\e[1m\e[33m Deploying to Zeit production...\e[0m"
now --prod
