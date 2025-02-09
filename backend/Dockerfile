# Backend
FROM node:23-alpine3.20

WORKDIR /backend

COPY . .

RUN rm -rf node_modules
RUN npm install

CMD npm run dev
