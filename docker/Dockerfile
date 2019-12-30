FROM nginx:1.17.5-alpine


LABEL name="Miclain Keffeler"


RUN apk add nodejs-current && \
    apk add npm && \
    apk add yarn

COPY ./nginx.conf /etc/nginx/
COPY ./docker-entrypoint.sh /

EXPOSE 8999

ENTRYPOINT ["/docker-entrypoint.sh"]
