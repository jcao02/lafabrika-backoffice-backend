-- Verify lafabrika:functions/users/select_user_password_combination on pg

BEGIN;

SET search_path TO lafabrika, public;
SELECT 'check_user_password_combination(TEXT, TEXT)'::regprocedure;

ROLLBACK;
