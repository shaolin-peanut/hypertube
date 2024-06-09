# Using the official Node.js 20 image as a base
FROM node:20-alpine

# Create and define the node app directory
WORKDIR /usr/src/app

# Install dependencies
COPY . .
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app npm run dev
CMD ["npm", "run", "dev"]