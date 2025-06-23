# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install with npm
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# 2) Production stage
FROM node:20-alpine AS runner

LABEL org.opencontainers.image.description="ClipChronicle Electron App – desktop clipboard manager with AI-powered snippet organization and local-first storage"

WORKDIR /app

# Copy over only what’s needed to run
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

# Use npm to start
CMD ["npm", "run", "start"]

# To build the image, run: (Replace hoangsonww with your GitHub username)
#  VERSION=$(node -p "require('./package.json').version")
#  docker build \
#    -t ghcr.io/hoangsonww/clipchronicle-landing:$VERSION \
#    .
# To push the image, run: (Replace hoangsonww with your GitHub username)
#  docker push ghcr.io/hoangsonww/clipchronicle-landing:$VERSION

