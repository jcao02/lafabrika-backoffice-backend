FROM postgres:9.6.11

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./docker-entrypoint-initdb.d/initdb.sh /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/*.sh
