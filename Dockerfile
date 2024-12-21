# https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa
# Quick guide on creating a docker image from a Vite React project for both dev and build versions
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]