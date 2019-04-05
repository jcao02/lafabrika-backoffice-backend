-- Revert lafabrika:functions/trigger_function_encrypt_password_before_insert from pg

BEGIN;

SET search_path TO lafabrika, public;
DROP FUNCTION encrypt_user_password();

COMMIT;
