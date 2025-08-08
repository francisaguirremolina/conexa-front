# Dockerfile for conexa-front
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only the files needed to install dependencies
COPY package*.json ./
COPY conexa-dependencies ./conexa-dependencies

RUN npm install

# Copy the rest of the project
COPY . .

RUN npm run build

# Final stage: only what is needed to run
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
