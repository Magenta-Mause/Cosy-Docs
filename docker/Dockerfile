FROM oven/bun:latest AS builder
WORKDIR /app

COPY . .

RUN bun install --ci

RUN bun run build

FROM nginx:stable-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/client /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
