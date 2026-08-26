# Web

The Next.js half of Sales Management. It renders the interface and proxies every
request to the API, which is where the rules live.

Start here instead:

- [Project README](../../README.md), what the system is and who it is for
- [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md), how the two applications
  fit together and how the roles are enforced
- [`docs/SETUP.md`](../../docs/SETUP.md), running everything, or just this half

```bash
pnpm install
API_BASE_URL=http://localhost:8080/api pnpm dev
```

Needs an API reachable at that address. `docker compose up` from the repository
root brings up both halves plus Postgres and Redis.
