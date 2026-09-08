FROM node:20-alpine AS builder

WORKDIR /app

# Копируем все package.json
COPY package*.json ./
COPY packages/demo/package*.json ./packages/demo/
COPY packages/ui/package*.json ./packages/ui/

# Устанавливаем зависимости
RUN npm ci

# Копируем исходники
COPY packages ./packages

# Собираем UI
WORKDIR /app/packages/ui
RUN npm run build

# Собираем demo
WORKDIR /app/packages/demo
RUN npm run build

# ---- production стадия ----
FROM node:20-alpine

WORKDIR /app

# Копируем результаты сборки
COPY --from=builder /app/packages/demo/.next ./.next
COPY --from=builder /app/packages/demo/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]