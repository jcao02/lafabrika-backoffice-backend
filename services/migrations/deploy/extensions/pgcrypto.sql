-- Deploy lafabrika:extensions/pgcrypto to pg

BEGIN;

SET search_path to lafabrika, public;

CREATE EXTENSION pgcrypto WITH SCHEMA lafabrika;

COMMIT;
