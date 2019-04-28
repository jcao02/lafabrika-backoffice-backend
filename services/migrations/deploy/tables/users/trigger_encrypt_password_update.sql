-- Deploy lafabrika:tables/users/trigger_encrypt_password_update to pg

BEGIN;

SET search_path TO lafabrika, public;

CREATE TRIGGER encrypt_password_edit
BEFORE UPDATE ON user_private_informations
FOR EACH ROW
WHEN (NEW.password <> OLD.password)
EXECUTE PROCEDURE encrypt_user_password();

COMMIT;
