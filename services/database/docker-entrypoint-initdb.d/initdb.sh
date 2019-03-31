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
