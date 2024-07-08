# Use Node 14 Alpine as the base image
FROM node:20-alpine

# RUN apk add --no-cache python3 make g++ openssl

# Set the working directory inside the container
WORKDIR /usr/src/app

# RUN npm install -g npm@latest
COPY package*.json ./
RUN npm install

COPY . .

# Expose the port that the React application will run on
EXPOSE 4000

# Start the React application
CMD ["npm", "start"]