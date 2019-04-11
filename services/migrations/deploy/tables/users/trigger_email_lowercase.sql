-- Deploy lafabrika:tables/users/trigger_email_lowercase to pg

BEGIN;

SET search_path TO lafabrika, public;

CREATE TRIGGER email_lowercase
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE email_lowercase();

COMMIT;
