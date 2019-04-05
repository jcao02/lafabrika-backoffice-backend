-- Verify lafabrika:extensions/pgcrypto on pg

BEGIN;

SET search_path to lafabrika, public;

SELECT 1/COUNT(*) FROM pg_extension WHERE extname = 'pgcrypto';

ROLLBACK;
