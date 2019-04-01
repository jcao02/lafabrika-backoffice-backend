-- Deploy lafabrika:tables/users to pg

BEGIN;

CREATE TABLE lafabrika.roles ( name TEXT PRIMARY KEY );

CREATE TABLE lafabrika.users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  role TEXT REFERENCES lafabrika.roles (name)
);

COMMIT;
