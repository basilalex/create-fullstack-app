FROM node:11.13.0-alpine

WORKDIR /app

COPY . /app

RUN npm i -g lerna knex yarn
RUN yarn
RUN yarn migrate
RUN yarn build

CMD yarn serve

EXPOSE 8080
