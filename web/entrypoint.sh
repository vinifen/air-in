#!/bin/sh

# web

echo "WEB_PORT: ${WEB_PORT}"
echo "WEB_DOMAIN: ${WEB_DOMAIN}"
echo "FRONT_URL: ${FRONT_URL}"
echo "BACK_URL: ${BACK_URL}"

envsubst '${WEB_PORT} ${WEB_DOMAIN} ${FRONT_URL} ${BACK_URL} ${WEB_FRONT_PATH} ${WEB_BACK_PATH} ${WEB_AUTH_PATH}' < /web/nginx.conf > /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'
