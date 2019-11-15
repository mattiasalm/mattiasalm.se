#!/usr/bin/env bash

if hash superstatic 2>/dev/null; then
    echo -e "\e[1m\e[32m Starting server...\e[0m"
    superstatic dist --port 8080 --host 127.0.0.1
else
    echo -e "\e[1m\e[31m superstatic not installed\n\nrun \e[0m\e[7m\e[1m npm i -g superstatic \e[0m"
fi

