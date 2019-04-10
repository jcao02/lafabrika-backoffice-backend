-- Verify lafabrika:functions/trigger_function_email_lowercase_before_insert on pg

BEGIN;

SET search_path TO lafabrika, public;
SELECT 'email_lowercase()'::regprocedure;

ROLLBACK;
