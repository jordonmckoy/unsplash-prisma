# base image
FROM node:12.16-alpine

# set working directory
WORKDIR /server

# install and cache app dependencies
COPY . /server
RUN npm install

# start app
CMD ["npm", "run", "dev"]