#!/bin/sh

envsubst '$WEB_URL $PORTA' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g "daemon off;"
