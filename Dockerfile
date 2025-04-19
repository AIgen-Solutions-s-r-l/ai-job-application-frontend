# Use the official Node.js image as the base image
FROM node:22 AS builder

LABEL org.opencontainers.image.source=https://github.com/AIHawk-Startup/frontend_service

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev && \
    npm install sharp && \
    npx update-browserslist-db@latest

# Copy the rest of the application code
COPY . .

RUN npm run build

# Production stage
FROM node:22-slim AS finale

WORKDIR /usr/src/app

# Create a new user and group
RUN groupadd -r webgroup && useradd -r -g webgroup webuser

# Change ownership of the application files
RUN chown -R webuser:webgroup /usr/src/app

COPY --from=builder --chown=webuser:webgroup /usr/src/app/package*.json ./
COPY --from=builder --chown=webuser:webgroup /usr/src/app/.next ./.next
COPY --from=builder --chown=webuser:webgroup /usr/src/app/public ./public
COPY --from=builder --chown=webuser:webgroup /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=webuser:webgroup /usr/src/app/next.config.js ./
COPY --from=builder --chown=webuser:webgroup /usr/src/app/next-sitemap.config.js ./
COPY --from=builder --chown=webuser:webgroup /usr/src/app/tsconfig.json ./
#COPY --from=builder --chown=webuser:webgroup /usr/src/app/.env ./  no file env because is all in kube deploy file


# Switch to the new user and group
USER webuser:webgroup

# Expose the port the app runs on
EXPOSE 3000

# Start the application
ENV NODE_ENV=development
CMD ["npm", "start"]