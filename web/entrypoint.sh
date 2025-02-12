#!/bin/sh

# web

envsubst '${WEB_PORT} ${WEB_DOMAIN} ${FRONT_URL} ${BACK_URL} ${WEB_BACK_PATH}' < /web/nginx.conf > /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'
