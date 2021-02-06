FROM node:latest

WORKDIR /app

COPY ./ ./

WORKDIR /app/client

EXPOSE 5000 5001

RUN npm install

ENV NODE_ENV=production

CMD [ "npm", "run", "start" ]



