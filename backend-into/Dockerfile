# Use a Node.js base image
FROM node:14-alpine

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"]
