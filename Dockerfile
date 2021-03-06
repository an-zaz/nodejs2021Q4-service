FROM node:16.3.0-alpine
WORKDIR /app/rs-node-app
COPY package.json package-lock.json ./
RUN npm install && rm ./package-lock.json
COPY . .
EXPOSE 4000
CMD npm start

