-- Revert lafabrika:tables/users/trigger_email_lowercase from pg

BEGIN;

SET search_path TO lafabrika, public;
DROP TRIGGER email_lowercase ON users;

COMMIT;
