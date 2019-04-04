#!/bin/bash


# Builds the database image with custom tag
build_database_image() {
  echo -n "Building database image $1...";

  currDir=$(pwd);

  databaseDir=$currDir/services/database

  cd $databaseDir;
  docker build . -t $1 &> /dev/null;

  cd $currDir;

  echo "Done!";
}

# Creates a docker bridge network with custom name
create_internal_network() {
  echo -n "Creating network $1...";

  docker network create $1 &> /dev/null;

  echo "Done!";
}

main() {
  build_database_image lafabrika/database:0.0.1;
  create_internal_network internal;
}

main;

