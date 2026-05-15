FROM node:22-alpine AS base
WORKDIR /app

COPY package.json package-lock.json turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
COPY scripts ./scripts

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 300000 \
 && npm install --include=dev
RUN npm run build --workspace=@telegram/contracts \
 && npm run build --workspace=@telegram/shared \
 && npm run build --workspace=@telegram/identity-service \
 && npm run build --workspace=@telegram/profile-service \
 && npm run build --workspace=@telegram/chat-service \
 && npm run build --workspace=@telegram/message-service \
 && npm run build --workspace=@telegram/contacts-service \
 && npm run build --workspace=@telegram/media-service \
 && npm run build --workspace=@telegram/notification-service \
 && npm run build --workspace=@telegram/call-service \
 && npm run build --workspace=@telegram/api-gateway

CMD ["node", "--version"]
