FROM quay.io/ukhomeofficedigital/cop-node:16 as builder

RUN apt-get update && apt-get upgrade -y

RUN mkdir -p /src
WORKDIR /src

COPY package*.json ./
RUN npm ci
COPY . /src

# This allows to pass env vars on runtime, see webpack.config.js:58 and run.sh
ENV SGMR_DATA_API_BASE_URL=REPLACE_SGMR_DATA_API_BASE_URL \
    SGMR_MAINTENANCE=REPLACE_SGMR_MAINTENANCE \
    GOV_NOTIFY_SUPPORT_EMAIL=REPLACE_GOV_NOTIFY_SUPPORT_EMAIL

RUN npm run build

# Now build the final image based on Nginx

FROM alpine:3.7

ENV NGINX_CONFIG_FILE=/etc/nginx/nginx.conf

RUN apk upgrade --no-cache && \
    apk add --no-cache nginx bash nginx-mod-http-lua && \
    install -d -g nginx -o nginx /run/nginx && \
    chown -R nginx:nginx /etc/nginx /var/log/nginx

COPY --from=builder /src/dist/ /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=100 /nginx/run.sh /run.sh

RUN chmod 700 /run.sh
RUN chown nginx /usr/share/nginx/html

# UID for nginx user
USER 100

EXPOSE 8080

ENTRYPOINT ["/run.sh"]
