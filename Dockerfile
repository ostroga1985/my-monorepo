
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем все package.json
COPY package*.json ./
COPY packages/demo/package*.json ./packages/demo/
COPY packages/ui/package*.json ./packages/ui/

# Устанавливаем зависимости
RUN npm install

# ФИКС: переустанавливаем React
RUN rm -rf node_modules/react node_modules/react-dom && \
    npm install react@18 react-dom@18

# Копируем исходники
COPY packages ./packages

# Собираем UI
WORKDIR /app/packages/ui
RUN npm run build

# ========== ДИАГНОСТИКА ПЕРЕД СБОРКОЙ DEMO ==========
WORKDIR /app/packages/demo

# Поиск всех копий React
RUN echo "=== ПОИСК ВСЕХ КОПИЙ REACT ===" && \
    find /app -name "react" -type d -path "*/node_modules/*" 2>/dev/null | xargs -I {} sh -c 'echo "{}: $(cat {}/package.json | grep version)"' || echo "No react copies found"

# Проверка версий
RUN echo "=== React version in demo ===" && \
    node -e "console.log('React version in demo:', require('react/package.json').version)" || echo "demo has no react"

RUN echo "=== React version in ui ===" && \
    node -e "try { console.log('React version in ui:', require('/app/packages/ui/node_modules/react/package.json').version) } catch(e) { console.log('ui has no react') }"

RUN echo "=== React version in root ===" && \
    node -e "try { console.log('React version in root:', require('/app/node_modules/react/package.json').version) } catch(e) { console.log('root has no react') }"

# Принудительно оставляем ТОЛЬКО одну версию в demo
RUN rm -rf /app/node_modules/react /app/node_modules/react-dom && \
    rm -rf /app/packages/ui/node_modules/react /app/packages/ui/node_modules/react-dom && \
    cd /app/packages/demo && npm install react@18.2.0 react-dom@18.2.0 --save-exact

# Собираем demo
RUN npm run build

# ---- production стадия ----
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/packages/demo/.next ./.next
COPY --from=builder /app/packages/demo/public ./public
COPY --from=builder /app/packages/demo/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]