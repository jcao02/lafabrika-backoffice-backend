#!/bin/bash
echo "Initializing lafabrika role...";
psql -U postgres -c "CREATE ROLE lafabrika WITH PASSWORD 'lafabrika'";
psql -U postgres -c "ALTER ROLE lafabrika WITH LOGIN";
psql -U postgres -c "ALTER ROLE lafabrika CREATEDB";

echo "Initializing lafabrika development database...";
psql -U postgres -c "CREATE DATABASE lafabrika_development OWNER lafabrika";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lafabrika_development TO lafabrika";

echo "Initializing lafabrika test database...";
psql -U postgres -c "CREATE DATABASE lafabrika_test OWNER lafabrika";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lafabrika_test TO lafabrika";

echo "Initalizing sqitch role..."
psql -U postgres -c "CREATE ROLE sqitch WITH PASSWORD 'sqitch'";
psql -U postgres -c "ALTER ROLE sqitch WITH LOGIN";
psql -U postgres -c "ALTER ROLE sqitch CREATEDB";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lafabrika_development TO sqitch";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lafabrika_test TO sqitch";

echo "Initializing sqitch registry..."
psql -U postgres -c "CREATE DATABASE sqitch OWNER sqitch";
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE sqitch TO sqitch";
