#!/bin/bash

dbName=$1

# delete all voyage reports and people in voyage reports added by the tests
docker exec -i $dbName \
psql -U user -d $dbName \
-c 'delete from voyagereportpeople where first_name like '\''%Auto-%'\''; 
    delete from voyagereport where vessel_name like '\''%Auto-Test-Vessel%'\'' or departure_port like '\''%Auto-%'\'';'
