-- Revert lafabrika:tables/users from pg

BEGIN;

DROP TABLE lafabrika.users;
DROP TABLE lafabrika.roles;

COMMIT;
