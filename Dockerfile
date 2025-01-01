# Use Node.js 18 slim base image
FROM node:18-slim

# Set the working directory
WORKDIR /Mero-Link

# Copy only package files first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app code
COPY . .

# Build the production version of the app
RUN npm run build --verbose

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]



