FROM node:18 AS builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

ARG SECRET_FILE
COPY $SECRET_FILE ./.env

RUN npm run install-all

RUN npm run build

FROM node:18-alpine

RUN apk update && \
		 apk add --no-cache curl vim git
		 
RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm i sharp --ignore-engines

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["npm", "run", "start-standalone"]