#!/bin/bash

docker-compose run -u `id -u $USER` migrations $@
