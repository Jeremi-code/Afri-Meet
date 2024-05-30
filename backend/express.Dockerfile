FROM node:20.13.1-alpine

WORKDIR /usr/src/app

ARG EXPRESS_PORT

EXPOSE ${EXPRESS_PORT}

COPY package.json package-lock.json ./

RUN npm install

COPY express ./express/

CMD ["node", "server.js"]