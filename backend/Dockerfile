# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install every dependency: index.ts is executed through ts-node at runtime, so
# TypeScript and ts-node (both devDependencies) must be present in the image.
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

RUN chown -R node:node /app
USER node

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["npx", "ts-node", "index.ts"]
