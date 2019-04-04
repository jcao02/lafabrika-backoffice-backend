-- Verify lafabrika:tables/users/trigger_encrypt_password on pg

BEGIN;

SET search_path TO lafabrika, public;

SELECT 1/count(*)
FROM information_schema.triggers
WHERE trigger_name = 'encrypt_password'
  AND event_object_table = 'users'
  AND event_manipulation = 'INSERT';


ROLLBACK;
