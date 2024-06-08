# Use Node 14 Alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./ 
RUN npm install

# Expose the port that the React application will run on
EXPOSE 4000

# Start the React application
CMD ["npm", "start"]