#!/bin/bash

currDir=$(pwd);

databaseDir=$(pwd)/services/database

cd $databaseDir;
docker build . -t lafabrika/database:0.0.1

cd $currDir;

