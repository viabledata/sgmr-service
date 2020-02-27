FROM quay.io/ukhomeofficedigital/cop-node:12-alpine as builder

RUN apk update && apk upgrade

RUN mkdir -p /src
WORKDIR /src

COPY package*.json ./
RUN npm install
