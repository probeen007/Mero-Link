# Production-optimized Dockerfile for Mero Link

# Use a lightweight Node.js base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Copy built app and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]




