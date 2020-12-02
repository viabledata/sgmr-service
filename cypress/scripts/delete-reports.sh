#!/bin/bash

dbName=$1

# delete all voyage reports and people in voyage reports added by the tests
docker exec -i $dbName \
psql -U user -d $dbName \
-c 'delete from voyagereportpeople where first_name like '\''%Auto-%'\''; 
    delete from voyagereport where user_id in (select id from users where email = '\''cb52ca14-0d64-4821-9970-4e81b47e13c1@mailslurp.com'\'');'
