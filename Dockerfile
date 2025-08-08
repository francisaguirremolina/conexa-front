# Dockerfile for conexa-front
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only the files needed to install dependencies
COPY package*.json ./
COPY conexa-dependencies ./conexa-dependencies

RUN npm install

# Copy the rest of the project
COPY . .

# Declare build args to be used as environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_URL_TIENDANUBE
ARG NEXT_PUBLIC_API_URL_VTEX
ARG NEXT_PUBLIC_API_URL_WOOCOMMERCE
ARG NEXT_PUBLIC_API_URL_PRESTASHOP

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL_TIENDANUBE=$NEXT_PUBLIC_API_URL_TIENDANUBE
ENV NEXT_PUBLIC_API_URL_VTEX=$NEXT_PUBLIC_API_URL_VTEX
ENV NEXT_PUBLIC_API_URL_WOOCOMMERCE=$NEXT_PUBLIC_API_URL_WOOCOMMERCE
ENV NEXT_PUBLIC_API_URL_PRESTASHOP=$NEXT_PUBLIC_API_URL_PRESTASHOP

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

