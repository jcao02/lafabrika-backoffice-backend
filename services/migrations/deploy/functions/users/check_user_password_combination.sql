-- Deploy lafabrika:functions/users/select_user_password_combination to pg

BEGIN;

SET search_path to lafabrika, public;

CREATE FUNCTION check_user_password_combination(uemail TEXT, upassword TEXT) RETURNS BOOLEAN
  LANGUAGE plpgsql
  AS $$
  DECLARE encrypted_pass TEXT;
  BEGIN

    SELECT upi.password INTO encrypted_pass
    FROM users u
    INNER JOIN user_private_informations upi ON u.id = upi.user_id
    WHERE u.email = uemail;

    RETURN FOUND AND crypt(upassword, encrypted_pass) = encrypted_pass;
  END;
  $$;

COMMIT;
