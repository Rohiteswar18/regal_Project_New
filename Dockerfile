# ----------------------------
# 1️⃣ Build React Frontend
# ----------------------------
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Install frontend deps
COPY package*.json ./
RUN npm install

# Copy React source
COPY src ./src
COPY public ./public

# Build React
RUN npm run build


# ----------------------------
# 2️⃣ Backend Dependencies
# ----------------------------
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

# Install backend deps
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend ./


# ----------------------------
# 3️⃣ Production Image
# ----------------------------
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy React build to root
COPY --from=frontend-build /app/build ./build

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "index.js"]