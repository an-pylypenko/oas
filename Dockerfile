## DEV

# FROM node:18-alpine
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install --silent
# CMD ["npm", "start"]


## PROD

#Stage 1
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
COPY package-lock*.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
