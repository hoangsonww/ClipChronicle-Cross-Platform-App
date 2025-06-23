FROM node:20 AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential libgtk-3-0 libnotify-dev libnss3 libxss1 libasound2
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN cd native-clipboard && cargo build --release
RUN pnpm make


FROM scratch AS artifacts
COPY --from=builder /app/out /out
