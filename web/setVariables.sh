#!/bin/sh

echo "WEB_PORT: ${WEB_PORT}"
echo "WEB_DOMAIN: ${WEB_DOMAIN}"
echo "FRONT_URL: ${FRONT_URL}"
echo "BACK_URL: ${BACK_URL}"

# Usando envsubst para substituir variáveis de ambiente no nginx.conf
envsubst '${WEB_PORT} ${WEB_DOMAIN} ${FRONT_URL} ${BACK_URL} ${WEB_FRONT_PATH} ${WEB_BACK_PATH}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Exibindo o conteúdo do nginx.conf após a substituição
cat /etc/nginx/nginx.conf

# Iniciando o Nginx
exec nginx -g 'daemon off;'
