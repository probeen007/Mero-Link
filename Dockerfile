# =========================
# Base image
# =========================
FROM node:20-alpine AS base

# =========================
# Dependencies stage
# =========================
FROM base AS deps
# Update packages and install system deps required for native node modules
RUN apk update && apk upgrade && \
    apk add --no-cache libc6-compat python3 make g++ \
    cairo-dev pango-dev giflib-dev

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies using lockfile
RUN if [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi

# =========================
# Build stage
# =========================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the app
RUN npm run build

# =========================
# Runner (production) stage
# =========================
FROM base AS runner
WORKDIR /app

# Update and add runtime-only tools
RUN apk update && apk upgrade && apk add --no-cache curl dumb-init

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only required build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Permissions
RUN find /app -type f -exec chmod 644 {} \; && \
    find /app -type d -exec chmod 755 {} \; && \
    chmod 755 /app/server.js

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add runtime protections
ENV NODE_OPTIONS="--max-old-space-size=512 --unhandled-rejections=strict"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start server
CMD ["dumb-init", "node", "server.js"]
