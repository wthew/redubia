
FROM node:20-bullseye AS base

FROM base AS deps

WORKDIR /app

COPY yarn.lock .
COPY package.json . 
RUN yarn --frozen-lockfile

COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY next.config.js .


COPY public ./public
COPY src ./src

EXPOSE 3000
CMD ["yarn", "dev"]
