FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

RUN npm build

CMD [ "npm", "run", "start" ]