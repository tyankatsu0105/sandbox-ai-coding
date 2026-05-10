# Use Node.js version specified in package.json engines field
FROM node:22.14.0-slim

# Install shell tools and CA roots required for HTTPS (git clone/fetch over TLS)
RUN apt-get update \
	&& apt-get install -y --no-install-recommends zsh ca-certificates \
	&& update-ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Update npm to the version specified in package.json
RUN npm install -g npm@10.9.2

# Set working directory
WORKDIR /workspace