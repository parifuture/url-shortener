FROM node:latest

RUN apt update && apt install -y apt-transport-https ca-certificates make python g++ sqlite3

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

ENV PORT=9050
EXPOSE 9050

CMD ["npm", "start"]
