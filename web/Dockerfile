#web
FROM nginx:stable-alpine3.20-perl

COPY nginx.conf /etc/nginx/nginx.conf

ENV WEB_DOMAIN: ${WEB_DOMAIN}
ENV WEB_FRONT_URL: ${WEB_FRONT_URL}
ENV WEB_BACK_URL: ${WEB_BACK_URL}

COPY setVariables.sh /setVariables.sh

RUN chmod +x /setVariables.sh

ENTRYPOINT [ "/setVariables.sh" ]

EXPOSE 80