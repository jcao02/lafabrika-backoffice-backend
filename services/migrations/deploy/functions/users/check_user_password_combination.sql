-- Deploy lafabrika:functions/users/select_user_password_combination to pg

BEGIN;

SET search_path to lafabrika, public;

CREATE FUNCTION check_user_password_combination(uemail TEXT, upassword TEXT) RETURNS BOOLEAN
  LANGUAGE plpgsql
  AS $$
  DECLARE encrypted_pass TEXT;
  BEGIN

    SELECT password INTO encrypted_pass
    FROM users
    WHERE email = uemail;

    RETURN FOUND AND crypt(upassword, encrypted_pass) = encrypted_pass;
  END;
  $$;

COMMIT;
