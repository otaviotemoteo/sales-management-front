# Stage 1: dependencies
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
# node:22, not 20: corepack installs the pnpm pinned in package.json, and
# current pnpm needs Node 22+ (on 20 it dies with ERR_UNKNOWN_BUILTIN_MODULE).
# pnpm-workspace.yaml carries the allowBuilds list; without it in the image,
# pnpm blocks @tailwindcss/oxide and sharp and exits 1 on install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: build
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 3: runtime
# No corepack and no pnpm here on purpose. `pnpm start` runs a dependency check
# before the script, which re-runs install inside a finished image and fails.
# The server is started from the Next binary directly.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
