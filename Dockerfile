FROM node:12

WORKDIR /usr/src/app

COPY ./client/package*.json ./imagefile

RUN npm install

COPY ./client ./imagefile

EXPOSE 8080

CMD ["node", "index.js"]