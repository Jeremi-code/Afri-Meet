FROM node:20.13.1-alpine as base

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

FROM base as build

COPY tsconfig.json ./

COPY ./src ./src

RUN npm run build

FROM node:20.13.1-alpine as prod

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

ARG EXPRESS_PORT=3000

EXPOSE ${EXPRESS_PORT}

CMD ["node", "./dist/server.js"]
