-- Verify lafabrika:tables/users/trigger_encrypt_password_update on pg

BEGIN;

SET search_path TO lafabrika, public;

SELECT 1/count(*)
FROM information_schema.triggers
WHERE trigger_name = 'encrypt_password_edit'
  AND event_object_table = 'user_private_informations'
  AND event_manipulation = 'UPDATE';

ROLLBACK;
