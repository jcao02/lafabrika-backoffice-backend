# La Fábrika Backoffice Backend
Backend services to hold backoffice operation within the company.

# Services
- Accountability: Handles the company's accountability.
- Database: Persists the data used by the services.
- Migrations: System to make migrations in the database service.

# Containers
The app is contained in Docker. Each service has its own `Dockerfile` and they're composed using the `docker-compose.yml` in the root folder.

To start developing:
  1. Go to `services/database` and run `docker build . -t lafabrika/database:0.0.1`
  2. Go to the root folder and run `docker-compose up`
