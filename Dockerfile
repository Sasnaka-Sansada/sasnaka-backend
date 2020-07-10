FROM node:latest

# create app directory
WORKDIR /home/app

# Install app dependencies
# A wildcard is used to ensure bothe package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${PORT}

ENTRYPOINT /bin/bash

# CMD [ "npm","run","dev"]
