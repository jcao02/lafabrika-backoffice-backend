-- Deploy lafabrika:functions/trigger_function_encrypt_password_before_insert to pg

BEGIN;

SET search_path TO lafabrika, public;

CREATE FUNCTION encrypt_user_password() RETURNS trigger
  LANGUAGE plpgsql
  AS $$
  BEGIN
    NEW.password := crypt(NEW.password, gen_salt('bf'));
    RETURN NEW;
  END;
  $$;

COMMIT;
