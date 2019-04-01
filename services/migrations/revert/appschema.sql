-- Revert lafabrika:appschema from pg

BEGIN;

DROP SCHEMA lafabrika;

COMMIT;
