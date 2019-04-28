-- Verify lafabrika:tables/users on pg

BEGIN;

SET search_path TO lafabrika, public;

SELECT user_id, password FROM user_private_informations WHERE FALSE;

SELECT name FROM roles WHERE FALSE;

SELECT
  id,
  email,
  first_name,
  last_name,
  created_at,
  role
FROM lafabrika.users WHERE FALSE;

ROLLBACK;
