FROM node:latest

RUN apt update && apt install -y apt-transport-https ca-certificates python g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

# copy source code
COPY . .
# COPY client/package.json client/package-lock.json client/.npmrc client/.eslintrc.json client/

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]
