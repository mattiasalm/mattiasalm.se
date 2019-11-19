#!/usr/bin/env bash

zsh build.sh &
wait &
zsh superstatic.sh &
zsh watch.sh &
wait
