# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Adding libc6-compat and build tools for native dependencies like sharp
RUN apk add --no-cache libc6-compat vips-dev fftw-dev g++ make python3 build-base

# Install pnpm
RUN npm install -g pnpm

# Copy and install dependencies
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies from deps stage
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Accept environment variables from the build command
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_NATUR_APP_ECS_URL

# Client side environment variables are prefixed with NEXT_PUBLIC_ should be passed to the build
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_NATUR_APP_ECS_URL=$NEXT_PUBLIC_NATUR_APP_ECS_URL

# Set the environment variable to production to enable optimizations and disable env validation
ENV NODE_ENV production

# Build the Next.js application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install runtime dependencies for sharp
RUN apk add --no-cache vips-dev fftw-dev libc6-compat

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a system group and user for running the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Copy the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the correct permissions for prerender cache
RUN chown -R nextjs:nodejs .next

# Accept environment variables from the build command
ARG AUTH_TRUST_HOST
ARG NEXTAUTH_SECRET
ARG NEXT_API_BASE_URL
ARG DATABASE_URL
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_BUCKET_NAME_PROFILE_IMGS
ARG AWS_BUCKET_NAME_GEOJSON
ARG AWS_BUCKET_NAME_PROJECT_MANAGEMENT
ARG SENDGRID_API_KEY
ARG EMAIL_FROM
ARG NATUR_ENDPOINT_URL

# Server side environment variables are passed to the runtime
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_API_BASE_URL=$NEXT_API_BASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV AWS_BUCKET_NAME_PROFILE_IMGS=$AWS_BUCKET_NAME_PROFILE_IMGS
ENV AWS_BUCKET_NAME_GEOJSON=$AWS_BUCKET_NAME_GEOJSON
ENV AWS_BUCKET_NAME_PROJECT_MANAGEMENT=$AWS_BUCKET_NAME_PROJECT_MANAGEMENT
ENV SENDGRID_API_KEY=$SENDGRID_API_KEY
ENV EMAIL_FROM=$EMAIL_FROM
ENV NATUR_ENDPOINT_URL=$NATUR_ENDPOINT_URL

# Expose the port the app runs on
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

# Use the created user to run the application
USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# Start the Next.js application
CMD ["node", "server.js"]
