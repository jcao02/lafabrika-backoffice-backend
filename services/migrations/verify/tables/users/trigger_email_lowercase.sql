-- Verify lafabrika:tables/users/trigger_email_lowercase on pg

BEGIN;

SET search_path TO lafabrika, public;

SELECT 1/count(*)
FROM information_schema.triggers
WHERE trigger_name = 'email_lowercase'
  AND event_object_table = 'users'
  AND event_manipulation = 'INSERT';

ROLLBACK;
