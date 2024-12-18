# Use the Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app's code to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Expose the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

