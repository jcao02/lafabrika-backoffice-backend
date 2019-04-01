# Migrations Service
This service is for changing the database schema of the database service. We're using sqitch to handle the migrations

Versions:
  - sqitch: 0.9999
  - postgresql-client: 9.6 (to match the database service version)

## Migrations
In order to add/revert/deploy/verify migrations we need to have the database running:
  1. Go to `services/database` and run `docker build . -t lafabrika/database:0.0.1`
  2. Go to the root folder of the project and run `docker-compose up`
  3. In this folder, run `docker-compose -u $(id -u $USER) exec <command>` where `<command>` is the sqitch command to be ran.

There's a volume between this service directory and the docker working directory, so any change performed within the docker will cause the files in your filesystem to change as well.