# DEV 배포 용 Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install

USER node

EXPOSE 8080
CMD [ "node", "server.js" ]