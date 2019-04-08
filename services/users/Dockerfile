FROM lafabrika/node-postgres-client

RUN mkdir -p /app
WORKDIR /app

COPY . /app

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
