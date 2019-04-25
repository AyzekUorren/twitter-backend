FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

EXPOSE 27017

CMD [ "npm", "run", "start:develop" ]