-- Revert lafabrika:tables/users from pg

BEGIN;

DROP TABLE lafabrika.roles;
DROP TABLE lafabrika.users;

COMMIT;
