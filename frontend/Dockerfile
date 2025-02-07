FROM node:23-alpine3.20

WORKDIR /frontend

ENV WEB_BACK_URL=${WEB_BACK_URL}
ENV FRONT_SCHEME=${FRONT_SCHEME}
ENV FRONT_DOMAIN=${FRONT_DOMAIN}


RUN rm -rf node_modules
COPY . . 

RUN npm install -g @angular/cli

RUN npm install

CMD ng serve

