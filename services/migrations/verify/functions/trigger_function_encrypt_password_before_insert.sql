-- Verify lafabrika:functions/trigger_function_encrypt_password_before_insert on pg

BEGIN;

SET search_path TO lafabrika, public;
SELECT 'encrypt_user_password()'::regprocedure;

ROLLBACK;
