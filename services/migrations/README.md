# Migrations Service
This service is for changing the database schema of the database service. We're using sqitch to handle the migrations

Versions:
  - sqitch: 0.9999
  - postgresql-client: 9.6 (to match the database service version)

## Migrations
In order to add/revert/deploy/verify migrations we need to have the database running:
  1. Go to the root folder an run `./mount.sh`.
  2. Go to the root folder  and run `./start.sh`.
  3. In this folder, run `./sqitch.sh <command>` where `<command>` is the command to be ran in the docker.

There's a volume between this service directory and the docker working directory, so any change performed within the docker will cause the files in your filesystem to change as well.

## Sqitch configuration
In order to add a migration, `sqitch` needs to know who's making the change--So the new version has an author. For this, we created a volume which takes the host machine user configuration inside the docker. You just need to add the file `~/.sqitch/sqitch.conf` with the following content:

```
[user]
  email = youremail@yourhost.com
  name = Your Name
```
