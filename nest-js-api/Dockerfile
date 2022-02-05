FROM node:16.3.0-alpine
WORKDIR /app/rs-node-app
COPY package.json package-lock.json ./
RUN npm install && rm ./package-lock.json
COPY .. .
EXPOSE 7000
CMD npm run start:dev

