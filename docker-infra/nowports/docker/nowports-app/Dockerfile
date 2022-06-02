FROM node:16-alpine

WORKDIR /usr/src/app

COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm install

CMD [ "npm", "run", "start" ]
