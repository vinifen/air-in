# Web Dev Prod
FROM nginx:stable-alpine3.20-perl

WORKDIR /web

COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf .

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]