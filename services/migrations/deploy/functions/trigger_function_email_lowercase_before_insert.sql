-- Deploy lafabrika:functions/trigger_function_email_lowercase_before_insert to pg

BEGIN;

SET search_path TO lafabrika, public;

CREATE FUNCTION email_lowercase() RETURNS trigger
  LANGUAGE plpgsql
  AS $$
  BEGIN
    NEW.email := LOWER(email);
    RETURN NEW;
  END;
  $$;

COMMIT;
