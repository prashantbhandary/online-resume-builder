# ---- Stage 1: Build ----
FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Stage 2: Runtime (with Tectonic for LaTeX → PDF) ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install Tectonic and font dependencies.
# Tectonic fetches packages on first run, so we warm its cache during the image build.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates curl xz-utils fontconfig \
      fonts-inter fonts-noto-cjk fonts-noto-cjk-extra fonts-noto-mono fonts-noto-serif \
    && rm -rf /var/lib/apt/lists/* && \
    curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh && \
    mv tectonic /usr/local/bin/tectonic && \
    chmod +x /usr/local/bin/tectonic && \
    fc-cache -f

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "run", "start"]
