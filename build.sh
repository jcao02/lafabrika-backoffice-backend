#!/bin/bash


install_npm_packages() {
  services=$@
  curr_dir=$(pwd)
  for service in $services; do
    cd ./services/$service
    if [ $(command -v yarn) ]; then
      yarn install
    else
      npm install
    fi
    cd $curr_dir
  done
}


main() {
  ( install_npm_packages authentication users accountability )
}

main
