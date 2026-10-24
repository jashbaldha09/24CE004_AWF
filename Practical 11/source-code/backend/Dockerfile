# Production Node.js Backend Container
FROM node:18-alpine

# Set container working directory
WORKDIR /app

# Copy package descriptors first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev --silent

# Copy application source code
COPY . .

# Expose backend REST API port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Run as non-root user for container security
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
