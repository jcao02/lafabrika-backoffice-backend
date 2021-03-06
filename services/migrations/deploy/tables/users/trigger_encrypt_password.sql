-- Deploy lafabrika:tables/users/trigger_encrypt_password to pg

BEGIN;

SET search_path TO lafabrika, public;

CREATE TRIGGER encrypt_password
BEFORE INSERT ON user_private_informations
FOR EACH ROW
EXECUTE PROCEDURE encrypt_user_password();

COMMIT;
