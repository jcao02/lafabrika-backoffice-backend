-- Revert lafabrika:functions/users/select_user_password_combination from pg

BEGIN;

SET search_path to lafabrika, public;
DROP FUNCTION check_user_password_combination(uemail TEXT, upassword TEXT);

COMMIT;
