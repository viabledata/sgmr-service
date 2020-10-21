#!/bin/bash

# delete all voyage reports and people in voyage reports added by the tests
docker exec -i sgmr_test_db \
psql -U user -d sgmr_test_db \
-c 'delete from voyagereportpeople where first_name like '\''%Auto-%'\''; 
    delete from voyagereport where vessel_name like '\''%Auto-Test-Vessel%'\'';'