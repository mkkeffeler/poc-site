#!/bin/bash

yarn install

env=$1
if [ $env == "dev" ] || [ $env == "prod" ]
then
    
    dot_env="./envs/.env.$env"
    if [ -f "$dot_env" ];
    then
        REACT_APP_ENV=$env yarn build
    else
        REACT_APP_ENV=dev yarn build
    fi
    
    
else
    echo "ENV value is not valid"
    exit 100
fi
