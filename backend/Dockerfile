# backend/Dockerfile
FROM node:23-alpine3.20

WORKDIR /backend

COPY . .

RUN rm -rf node_modules
RUN npm install

RUN apk add --no-cache bash

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

CMD ["/usr/local/bin/wait-for-it.sh", "db:3306", "--", "npm", "run", "dev"]
