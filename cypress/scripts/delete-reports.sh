#!/bin/bash

dbName=$1

# delete all voyage reports and people in voyage reports added by the tests
docker exec -i $dbName \
psql -U user -d $dbName \
-c 'delete from voyagereportpeople where first_name like '\''%Auto-%'\''; 
    delete from voyagereport where user_id in (select id from users where email = '\''49c33d3a-4f67-4a6e-b5d9-b81439b6e7ea@mailslurp.com'\'');'
