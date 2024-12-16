FROM node:22-alpine AS build
ARG VITE_BACKEND_SERVER_URL
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /app
