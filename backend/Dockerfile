# Using the official Node.js 20 image as a base
FROM node:20-alpine

# Create and define the node app directory
WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
