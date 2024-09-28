FROM node:20
COPY wait-for-db-start.sh /usr/local/bin/wait-for-db-start.sh
RUN chmod +x /usr/local/bin/wait-for-db-start.sh

RUN apt update && apt install -y mariadb-client

WORKDIR /app

LABEL org.opencontainers.image.source=https://github.com/MAtt5816/expressJS-api-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "wait-for-db-start.sh -- npm start"]
