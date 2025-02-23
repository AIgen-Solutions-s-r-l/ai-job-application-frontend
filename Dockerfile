# Use the official Node.js image as the base image
FROM node:18

LABEL org.opencontainers.image.source=https://github.com/AIHawk-Startup/frontend_service

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a new user and group
RUN groupadd -r webgroup && useradd -r -g webgroup webuser

# Change ownership of the application files
RUN chown -R webuser:webgroup /usr/src/app

# Switch to the new user and group
USER webuser:webgroup

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]