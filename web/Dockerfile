#web
FROM nginx:stable-alpine3.20-perl

ENV WEB_PORT: ${WEB_PORT}
ENV WEB_DOMAIN: ${WEB_DOMAIN}
ENV FRONT_URL: ${FRONT_URL}
ENV BACK_URL: ${BACK_URL}

COPY setVariables.sh /setVariables.sh

RUN chmod +x /setVariables.sh

ENTRYPOINT [ "/setVariables.sh" ]

EXPOSE 80