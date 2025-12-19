# Install production dependencies separately to leverage caching
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
# Set npm retry + timeout configs to reduce transient network failures
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retries 5 \
    && npm config set registry https://registry.npmjs.org \
    && if [ -f package-lock.json ]; then npm ci --ignore-scripts; \
       elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
       elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
       else npm install --legacy-peer-deps; fi

# Build stage
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure env exists at build time if needed by Next
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add --no-cache openssl libc6-compat
# Skip ESLint during container build to avoid missing TypeScript parser
ENV NEXT_DISABLE_ESLINT=1
# Build app (support classic and turbopack scripts)
RUN npm run build || npm run build:classic

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Copy only the built artifacts and required files
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/next.config.mjs ./next.config.mjs

# Install production deps only
RUN if [ -f package-lock.json ]; then npm ci --omit=dev --ignore-scripts; else npm i --omit=dev --ignore-scripts; fi
EXPOSE 3000
CMD ["npm", "start"]
