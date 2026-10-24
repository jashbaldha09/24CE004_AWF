# Multi-Stage Build for React Frontend
# Stage 1: Build Environment
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

# Stage 2: Production Web Server
FROM node:18-alpine AS runner

WORKDIR /app

# Install lightweight production static server
RUN npm install -g serve --silent

# Copy compiled assets from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5173

# Non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

CMD ["serve", "-s", "dist", "-l", "5173"]
