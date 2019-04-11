-- Revert lafabrika:functions/trigger_function_email_lowercase_before_insert from pg

BEGIN;

SET search_path TO lafabrika, public;
DROP FUNCTION email_lowercase();

COMMIT;
