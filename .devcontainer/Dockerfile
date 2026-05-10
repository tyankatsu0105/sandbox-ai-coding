# Use Node.js version specified in package.json engines field
FROM node:22.14.0-slim

# Set working directory
WORKDIR /workspace

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Update npm to the version specified in package.json
RUN npm install -g npm@10.9.2

# Copy the rest of the application
COPY . .

# Default command
CMD ["npm", "run", "dev"]