FROM node:14.16.1-alpine

RUN yarn global add nodemon

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD nodemon src/index.js