# --- Stage 1: Builder ------------------------------------------------------
FROM node:20-alpine AS builder

LABEL org.opencontainers.image.title="ClipChronicle Browser Extension"
LABEL org.opencontainers.image.description="Clipboard history manager extension for Chrome/Edge with React front-end"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.authors="Son Nguyen <hoangson091104@gmail.com>"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Runtime ------------------------------------------------------
FROM nginx:alpine

LABEL org.opencontainers.image.title="ClipChronicle Browser Extension"
LABEL org.opencontainers.image.description="Clipboard history manager extension for Chrome/Edge with React front-end"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.authors="Son Nguyen <hoangson091104@gmail.com>"

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# To build the image, run: (Replace hoangsonww with your GitHub username)
#  VERSION=$(node -p "require('./package.json').version")
#  docker build \
#    -t ghcr.io/hoangsonww/clipchronicle-browser-extension:$VERSION \
#    .
# To push the image, run: (Replace hoangsonww with your GitHub username)
#  docker push ghcr.io/hoangsonww/clipchronicle-browser-extension:$VERSION
