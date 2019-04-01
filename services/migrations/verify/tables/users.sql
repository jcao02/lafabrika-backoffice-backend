-- Verify lafabrika:tables/users on pg

BEGIN;

SELECT name FROM lafabrika.roles WHERE FALSE;

SELECT
  id,
  email,
  first_name,
  last_name,
  created_at,
  role
FROM lafabrika.users WHERE FALSE;

ROLLBACK;
