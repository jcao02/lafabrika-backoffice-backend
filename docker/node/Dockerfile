FROM lafabrika/postgres-client AS psql-build

FROM node:dubnium-stretch

COPY --from=psql-build /usr/bin/psql /usr/bin

RUN npm install -g npm

