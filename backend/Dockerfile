# Backend Prod
FROM node:23-alpine3.20

WORKDIR /backend

COPY . .
RUN chmod +x /backend/configureBackend.sh
RUN /backend/configureBackend.sh
RUN npm run build
CMD npm run start

