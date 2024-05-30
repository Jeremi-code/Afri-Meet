FROM node:20.13.1-alpine as base

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY ./express/src .express/src

FROM node:20.11.1-alpine

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules ./

ARG EXPRESS_PORT

EXPOSE ${EXPRESS_PORT}

COPY --from=base /usr/src/app/express ./express

CMD ["node", "./express/dist/server.js"]