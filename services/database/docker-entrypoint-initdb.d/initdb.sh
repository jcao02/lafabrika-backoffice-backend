#!/bin/bash
echo "Initializing lafabrika role...";
psql -U postgres -c "CREATE ROLE lafabrika WITH PASSWORD 'lafabrika'";
psql -U postgres -c "ALTER ROLE lafabrika WITH LOGIN";
psql -U postgres -c "ALTER ROLE lafabrika CREATEDB";

echo "Initializing lafabrika database...";
psql -U postgres -c "CREATE DATABASE lafabrika OWNER lafabrika";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lafabrika TO lafabrika";

echo "Initalizing sqitch role..."
psql -U postgres -c "CREATE ROLE sqitch WITH PASSWORD 'sqitch'";
psql -U postgres -c "ALTER ROLE sqitch WITH LOGIN";
psql -U postgres -c "ALTER ROLE sqitch WITH SUPERUSER";
