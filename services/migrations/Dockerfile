# Stage to install postgresql client
FROM buildpack-deps:stretch as psql-build

RUN apt-get update
RUN apt-get install -y wget libpq-dev
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" >> /etc/apt/sources.list.d/pgdg.list

RUN apt-get install -y gnupg
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get install -y postgresql-client-9.6

# Create workdir
RUN mkdir -p /migrations

# Stage to install sqitch
FROM sqitch/sqitch:0.9999 as sqitch

COPY --from=psql-build /usr/bin/psql /usr/bin

WORKDIR /migrations
COPY . /migrations

