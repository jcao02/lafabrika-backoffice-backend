-- Revert lafabrika:extensions/pgcrypto from pg

BEGIN;

SET search_path to lafabrika, public;

DROP EXTENSION pgcrypto;

COMMIT;
