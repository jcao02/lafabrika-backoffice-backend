#!/bin/bash

docker-compose exec -u `id -u $USER` migrations sqitch $@;
