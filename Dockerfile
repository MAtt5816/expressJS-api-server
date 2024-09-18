FROM node:16

WORKDIR /app

LABEL org.opencontainers.image.source=https://github.com/MAtt5816/expressJS-api-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
