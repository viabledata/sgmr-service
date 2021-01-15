#!/usr/bin/env bash

 echo "== Starting cypress tests =="

 cypress run --env configFile=dev,mailSlurpApiKey=${MAILSLURP_API_KEY}