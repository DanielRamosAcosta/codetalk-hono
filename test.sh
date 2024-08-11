#!/usr/bin/env bash

curl --location 'localhost:3000/api/v1/speakers/registration' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "b741e452-a5ca-48f3-92f0-5bdbc4d84c81",
  "password": "xpRules123"
}'