# Use Node.js version specified in package.json engines field
FROM node:22.14.0-slim

# Install zsh (required by devcontainer terminal settings)
RUN apt-get update && apt-get install -y zsh && rm -rf /var/lib/apt/lists/*

# Update npm to the version specified in package.json
RUN npm install -g npm@10.9.2

# Set working directory
WORKDIR /workspace