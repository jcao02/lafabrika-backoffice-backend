-- Revert lafabrika:tables/users from pg

BEGIN;

SET search_path TO lafabrika, public;

DROP TABLE user_private_informations;
DROP TABLE users;
DROP TABLE roles;

COMMIT;
