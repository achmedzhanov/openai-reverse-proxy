FROM node:18

WORKDIR /app

RUN npm install express express-http-proxy

COPY . .

EXPOSE 7860

CMD [ "node", "server.js" ]