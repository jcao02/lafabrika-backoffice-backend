-- Revert lafabrika:tables/users/trigger_encrypt_password_update from pg

BEGIN;

SET search_path TO lafabrika, public;

DROP TRIGGER encrypt_password_edit ON user_private_informations;

COMMIT;
