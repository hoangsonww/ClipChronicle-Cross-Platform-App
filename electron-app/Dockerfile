# --- Stage 1: Builder ------------------------------------------------------
FROM debian:bookworm-slim AS builder

# Install system dependencies needed by Electron Forge, deb & rpm makers
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    fontconfig \
    libgtk-3-0 \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libx11-xcb1 \
    build-essential \
    rpm \
    dpkg \
    fakeroot \
  && rm -rf /var/lib/apt/lists/*

# Install Node.js LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm@latest

WORKDIR /app

# Copy package manifests and install JavaScript deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build & package the Electron app
RUN npm run package \
 && npm run make

# --- Stage 2: Artifacts ----------------------------------------------------
FROM scratch AS artifacts

LABEL org.opencontainers.image.description="ClipChronicle Electron App – desktop clipboard manager with AI-powered snippet organization and local-first storage"

# Copy packaged installers out of the builder stage
COPY --from=builder /app/out /out

# Metadata labels
LABEL org.opencontainers.image.title="ClipChronicle Electron App"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.authors="Son Nguyen <hoangson091104@gmail.com>"

# To build the image, run: (Replace hoangsonww with your GitHub username)
#  VERSION=$(node -p "require('./package.json').version")
#  docker build \
#   -t ghcr.io/hoangsonww/clipchronicle-native-app:$VERSION \
#   -f Dockerfile .
# To push the image, run: (Replace hoangsonww with your GitHub username)
#  docker push ghcr.io/hoangsonww/clipchronicle-native-app:$VERSION
