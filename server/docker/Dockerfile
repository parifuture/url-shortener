# ---- 1. `base` stage: Run `npm ci` and `npm install` ----
FROM node:14.15.4-alpine AS base

RUN apk --update add make python g++

WORKDIR /app

# install server deps
# we do these copies explicitly before copying the entire server / client directories so we can use
# docker's layer caching: https://docs.semaphoreci.com/article/81-docker-layer-caching#the-copy-command
# to avoid running npm install again if the package / package-lock / .npmrc files have not changed
COPY server/package.json server/package-lock.json server/.npmrc server/
RUN cd server && npm ci

# install client deps
COPY client/package.json client/package-lock.json client/.npmrc client/
RUN cd client && npm ci
# node-sass segfaults when we try to use it in a container running on an
# alpine host unless we rebuild. See https://github.com/sass/node-sass/issues/2031
RUN cd client && npm rebuild node-sass --build-from-source

# compile server
# Use a stub root `package.json` that will be replaced in a later stage.
RUN echo '{}' > package.json
COPY server/ server/
RUN cd server && npm run compile

# compile client
COPY client/ client/
RUN cd client && yarn build:prod

# ---- 2. `npm-production` stage: Install only the `--production` packages ----
FROM node:14.15.4-alpine AS npm-production

# NOTE: This layer (`npm-production`) is a dedicated layer intended to utilize
#       caching. It **only** depends on `package.json` (and the package lock).
WORKDIR /app
COPY server/package.json server/package-lock.json server/.npmrc server/
RUN cd server && npm ci --production

COPY client/package.json client/package-lock.json client/.npmrc client/
RUN cd client && npm ci --production

# ---- 3. `app` stage: Run the actual application ----
FROM node:14.15.4-alpine AS app

WORKDIR /app
# Copy `node_modules/` from `npm-production` so that `devDependencies` are
# not included in the production image.
COPY --from=npm-production /app/client/node_modules/ /app/client/node_modules/
COPY --from=npm-production /app/server/node_modules/ /app/server/node_modules/
# Copy built `dist/` artifacts.
COPY --from=base /app/client/ /app/client/
COPY --from=base /app/server/dist/ /app/server/dist/
# The **root** `package.json` is used as the source of truth for the service
# name and version.
COPY package.json /app/server/dist/package.json

EXPOSE 9050
WORKDIR /app/server/dist/src
ENTRYPOINT node --max-old-space-size=300 --nouse-idle-notification web.js
