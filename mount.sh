#!/bin/bash

# Builds image in specified directory ($1) and tag ($2)
build_image () {
  echo -n "Building image $2 in $1...";

  currDir=$(pwd);

  cd $1;
  docker build . -t $2 &> /dev/null;

  cd $currDir;

  echo "Done!";
}

# Creates a directory in the current directory with custom name
create_database_volume_directory() {
  currDir=$(pwd);
  echo -n "Creating database volume directory $currDir/$1...";

  mkdir -p $currDir/$1;

  echo "Done!";
}

# Creates a docker bridge network with custom name
create_internal_network() {
  echo -n "Creating network $1...";

  docker network create $1 &> /dev/null;

  echo "Done!";
}

main() {
  build_image ./docker/postgres-client lafabrika/postgres-client
  build_image ./docker/node lafabrika/node-postgres-client
  build_image ./services/database lafabrika/database:0.0.1
  create_database_volume_directory pg-data;
  create_internal_network internal;
}

main;

