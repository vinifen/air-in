FROM node:23-alpine3.20

WORKDIR /frontend

COPY . .

RUN rm -rf node_modules

RUN npm install -g @angular/cli

RUN npm install

RUN chmod +x /frontend/entrypoint.sh

ENTRYPOINT ["/frontend/entrypoint.sh"]
