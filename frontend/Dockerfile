# Frontend Prod
FROM node:23-alpine3.20

WORKDIR /frontend

ARG WEB_BACK_URL

COPY . .

RUN chmod +x /frontend/configureFrontend.sh
RUN /frontend/configureFrontend.sh

RUN ng build --configuration production

RUN npm install -g http-server

CMD http-server dist/air-in/browser -p ${FRONT_PORT} -a 0.0.0.0

