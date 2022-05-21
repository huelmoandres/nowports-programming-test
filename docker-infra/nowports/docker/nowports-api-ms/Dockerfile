FROM node:16-alpine

WORKDIR /usr/src/app

COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY ./src ./src

RUN npm install

CMD node ./src/index.js
