-- Deploy lafabrika:tables/users to pg

BEGIN;

SET search_path TO lafabrika, public;

-- Roles have a weak relationship to users
CREATE TABLE roles ( name TEXT PRIMARY KEY );

-- Main table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  role TEXT NOT NULL REFERENCES roles (name)
);

-- User private informations have a weak relationship to users
CREATE TABLE user_private_informations (
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  password TEXT NOT NULL
);

COMMIT;
