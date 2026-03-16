FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json angular.json tsconfig*.json ./
COPY .postcssrc.json ./
COPY src ./src
COPY public ./public
RUN npm ci
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/tributo_frontend/browser/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]