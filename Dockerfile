FROM node:latest

WORKDIR /app

COPY ./client ./

WORKDIR /app/client

EXPOSE 5000 80

RUN npm install

ENV NODE_ENV=production

CMD [ "npm", "run", "start" ]



