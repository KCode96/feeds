# Install dependencies only wen needed
FROM node:19.1.0-alpine3.16 AS deps

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:19.1.0-alpine3.16 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
COPY .env.production .

# Production image, copy all the files and run next
FROM node:19.1.0-alpine3.16 AS runnder

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
