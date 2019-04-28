-- Revert lafabrika:tables/users/trigger_encrypt_password from pg

BEGIN;

SET search_path TO lafabrika, public;

DROP TRIGGER encrypt_password ON user_private_informations;

COMMIT;
