#!/bin/sh
cd /app
yarn install

nginx >> /output.log & yarn start >> /output.log & tail -f /output.log
