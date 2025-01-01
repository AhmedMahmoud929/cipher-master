# Use the official Node.js image as the base image
FROM node:18-alpine AS base

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the TypeScript application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# If using next.config.ts, rename it to next.config.js for runtime compatibility
COPY --from=base /app/next.config.ts ./next.config.js

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
