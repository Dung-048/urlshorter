# Build backend
FROM node:20-slim AS dist
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci  # Cài đầy đủ dependencies, bao gồm @nestjs/cli
COPY backend .
RUN npm run build  # Chạy build với NestJS

# Prepare node_modules for backend (chỉ giữ dependencies cần thiết)
FROM node:20-slim AS node_modules
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev  # Chỉ cài dependencies cần thiết để chạy app

# Final image
FROM node:20-slim
ARG PORT=80
WORKDIR /usr/src/app

# Copy built files từ dist stage
COPY --from=dist /app/dist /usr/src/app/dist
COPY --from=node_modules /app/node_modules /usr/src/app/node_modules
COPY backend /usr/src/app

EXPOSE $PORT

# Cấp quyền chạy cho start.sh
COPY backend/start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]
