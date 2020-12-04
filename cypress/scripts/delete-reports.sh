#!/bin/bash

dbName=$1

# delete all voyage reports and people in voyage reports added by the tests
docker exec -i $dbName \
psql -U user -d $dbName \
-c 'delete from voyagereportpeople where first_name like '\''%Auto-%'\''; 
    delete from voyagereport where user_id in (select id from users where email = '\''658bfbb0-47bc-4bb6-b256-412c1534b602@mailslurp.com'\'');'
