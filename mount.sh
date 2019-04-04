#!/bin/bash


# Builds the database image with custom tag
build_database_image() {
  echo -n "Building database image $1...";

  currDir=$(pwd);

  databaseDir=$currDir/services/database

  # Build the image
  cd $databaseDir;
  docker build . -t $1 &> /dev/null;

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
  build_database_image lafabrika/database:0.0.1;
  create_database_volume_directory pg-data;
  create_internal_network internal;
}

main;

