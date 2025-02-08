#db
FROM mysql:8.0-debian

ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${DB_NAME}
ENV MYSQL_USER=${DB_USER}
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

COPY ./my_custom.cnf /etc/mysql/conf.d/my_custom.cnf

COPY ./air-in-db.sql /docker-entrypoint-initdb.d/air-in-db.sql
