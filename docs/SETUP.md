# Setup

---

## Platforms

Runs anywhere Docker does, Windows included. Every image publishes arm64, so
Apple Silicon needs nothing special: verified there with the full stack up,
migrations applied, the development seed loaded and a login returning a token.

Running the halves outside Docker needs Node 22 or newer for the web app (the
pinned pnpm does not run on Node 20) and JDK 17 for the API.

## The whole system, two commands

```bash
cp .env.example .env
docker compose up
```

That is the target and there is no third step. Postgres and Redis come up first
and are waited on by their health checks; the API container then applies the
Flyway migrations and, on the `dev` profile, seeds the demo accounts as part of
its own startup; the web container builds and serves the interface.

The first run compiles a Spring Boot jar and a Next.js production build, so it
takes several minutes. Subsequent runs reuse the images.

| Service | URL |
|---|---|
| Web | http://localhost:3000 |
| API | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/api/swagger-ui.html |
| PostgreSQL | `localhost:5434` |
| Redis | `localhost:6380` |

```bash
docker compose down      # stop
docker compose down -v   # stop and wipe the database
```

## Demo accounts

Seeded only under `SPRING_PROFILE=dev`, which is the default in
`.env.example`.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@sales.local` | `admin123` |
| Seller | `seller@sales.local` | `seller123` |

Set `SPRING_PROFILE=prod` and nothing is seeded: you get the schema and an empty
database. Do that for anything that is not your laptop, and change `JWT_SECRET`
while you are there.

---

## Environment

Copied from `.env.example`. Every default works for local development.

| Variable | Default | What it is |
|---|---|---|
| `SPRING_PROFILE` | `dev` | `dev` migrates and seeds; `prod` migrates only |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD` | `sales_db`, `sales_user`, `sales_pass` | PostgreSQL credentials |
| `DB_PORT` | `5434` | Host port for Postgres |
| `REDIS_PORT` | `6380` | Host port for Redis |
| `API_PORT` | `8080` | Host port for the API |
| `WEB_PORT` | `3000` | Host port for the web app |
| `JWT_SECRET` | provided | Base64 secret signing the tokens. Replace outside dev |

`API_BASE_URL` is set in `docker-compose.yml` rather than in `.env`, because its
correct value is a container name (`http://api:8080/api`) and not something you
should have to know. It is read on the server only and never reaches the
browser: the browser talks to the Next.js app, which talks to the API.

---

## Running one half at a time

### The web app alone

```bash
cd apps/web
pnpm install
API_BASE_URL=http://localhost:8080/api pnpm dev
```

Needs Node 22 or newer and an API reachable at that address. The pnpm version
is pinned in `package.json`, so `corepack enable` fetches the right one, and
that pinned version does not run on Node 20.

### The API alone

```bash
cd apps/api
./mvnw spring-boot:run
```

Needs JDK 17 and reachable PostgreSQL and Redis instances. The `dev` profile
defaults to a database called `sales_db` (user `sales_user`, password
`sales_pass`) on `localhost:5432` and Redis on `localhost:6379`. The Maven
wrapper is committed, so Maven does not need to be installed. On Windows use
`mvnw.cmd`.

`apps/api/docker-compose.yml` is the backend's own standalone stack from before
the merge, and still works if you create an `apps/api/.env` for it. The root
compose file is the one to use for everything else.

Tests:

```bash
cd apps/api && ./mvnw test
```

---

## Troubleshooting

**`pnpm install` exits 1 complaining about ignored build scripts.** pnpm 10 and
newer block install scripts by default, and two dependencies here genuinely need
theirs: `@tailwindcss/oxide` builds the native CSS engine, `sharp` fetches its
image binaries. `apps/web/pnpm-workspace.yaml` allows exactly those two. If your
pnpm version reads a different key, `pnpm approve-builds --all` writes the right
one for you.

**A port is already taken.** Every published port is a variable in `.env`.
Change `DB_PORT`, `REDIS_PORT`, `API_PORT` or `WEB_PORT` and bring the stack
back up. The ports containers use to talk to each other are internal and
unaffected.

**The web app answers but every request fails.** That is `API_BASE_URL`. Inside
Docker it must be `http://api:8080/api`; running the web app on the host against
a containerised API it is `http://localhost:8080/api`. `localhost` inside the
web container is the web container.

**The API restarts in a loop on first boot.** Check whether Flyway failed. A
partially applied schema from an interrupted earlier run is the usual cause, and
`docker compose down -v` clears it by dropping the volume.

**Dashboard numbers look stale.** They are cached in Redis and evicted by the
write paths that change them. If a number is wrong after a write that should
have evicted it, that is a missing `@CacheEvict` and not a timing problem.

---

## Testing

[`TESTING.md`](TESTING.md) is the end-to-end checklist: both roles, every flow,
and the states worth checking by hand.
