FROM node:dubnium-stretch

RUN apt-get update
RUN apt-get install -y wget libpq-dev
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" >> /etc/apt/sources.list.d/pgdg.list

RUN apt-get install -y gnupg
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get install -y postgresql-client-9.6

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm i
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
