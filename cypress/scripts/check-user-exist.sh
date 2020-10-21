#!/bin/bash

user=$1

docker exec -i sgmr_test_db \
psql -U user -d sgmr_test_db \
-c 'select * from users where email = '\'$user\''';