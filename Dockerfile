
FROM node:20-alpine AS base

FROM base AS deps

WORKDIR /app

COPY yarn.lock .
COPY package.json . 
RUN yarn install

COPY tsconfig.json .
COPY postcss.config.mjs .
COPY next.config.ts .
COPY kubb.config.ts .

COPY public ./public
COPY src ./src

EXPOSE 3000
CMD ["yarn", "dev"]
