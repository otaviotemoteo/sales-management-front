# Architecture

Two applications in one repository, brought together so that the whole system is
one clone and one command.

```
apps/web/    Next.js App Router, the interface and a thin proxy
apps/api/    Spring Boot REST API, every rule
docker-compose.yml
docs/
```

Both halves kept their own history. `apps/api` was brought in with `git subtree`
rather than copied, so the commits that built the backend are still in this
repository's log and the repository does not understate how much work went into
it.

---

## The request path

```
browser  →  Next.js route handler  →  Spring API  →  PostgreSQL
                                                  ↘  Redis (cache)
```

The browser never talks to the Spring API. Every call goes to a route handler
under `apps/web/app/api/`, which forwards it with the caller's token. Two things
follow from that. The API's address is a server-side variable
(`API_BASE_URL`) and never reaches the browser bundle, which is why in Docker it
is a container name rather than `localhost`. And the JWT lives in an
HTTP-only cookie the client-side JavaScript cannot read, because the code that
attaches it to the outgoing request runs on the server.

---

## Roles

Two, `ADMIN` and `SELLER`, carried in the JWT and enforced in three places, each
doing a different job.

**Middleware, in the web app.** Reads the role out of the token, checks the
expiry, and redirects. A seller who types an `/admin` URL lands on their own
dashboard; a logged-in user who opens the login page is sent to whichever
dashboard is theirs. This is routing, not security: it decides which page you
see, and it happens before any data is fetched.

**`@PreAuthorize` on the controller.** Listing every sale, managing products,
managing users: all annotated `hasRole('ADMIN')`. This is the boundary that
actually holds, and it holds whether the request came through the web app or
from curl.

**Scoping inside the service.** The seller-facing endpoints do not take a seller
id. `GET /sales/my-sales` resolves the current user from the security context
and queries with it, and creating a sale attaches the authenticated user as the
seller. A seller cannot ask for somebody else's sales because there is no
parameter in which to ask.

The result is a clean split. A seller registers customers, creates sales and sees
their own. An admin sees everything: all sales, all sellers, the product
catalogue, the reports, and the payment status of anything that went out.

---

## The sale

A sale is a header plus its items, priced at the moment it is written, with a
status and a payment beside it.

- `Sale` carries the customer, the seller, the totals, an optional discount, a
  `SaleStatus` (pending, confirmed, cancelled) and its relationship to a
  `Payment`.
- `SaleItem` carries the product, the quantity and the unit price **as it was
  when the sale happened**. A later price change does not rewrite history, which
  is the whole reason the price is copied onto the line rather than read through
  the product.
- `Payment` carries the method (PIX, cash, debit, credit), a status, the amount
  and the date it was settled.

That last one is worth being precise about. `Payment` is a record of a payment,
not a payment. Nothing here talks to a card terminal or a PIX provider: the
seller records how the customer paid, and marking a sale as settled is an action
someone takes. The system replaces the notebook, not the machine.

Cancelling a sale is a status change rather than a delete, so a cancelled sale
stays in the history with its reason to exist intact.

---

## Caching and audit

**Redis** caches the dashboard and the per-seller statistics, both of which
aggregate across the whole sales table and are read far more often than they
change. Every write path that could move those numbers, creating a sale,
updating one, cancelling one, marking a payment, evicts them by name. Choosing
eviction over a short expiry means a seller who just recorded a sale sees it
reflected immediately, which matters more here than the cache hit rate.

**`AuditLog`** records who did what to which record. It has its own controller
with search by entity, by action, by user, by time window, and combinations of
those, which is more query surface than the interface currently uses.

---

## Data

PostgreSQL, with **Flyway** migrations under
`apps/api/src/main/resources/db/migration`, applied automatically when the API
starts. Seven migrations so far, and the numbered sequence is also the record of
how the schema arrived where it is: V6 added the user profile fields, V7 made
the password column nullable so an invited user could exist before choosing one.

Entities: `User`, `Customer`, `Product`, `Sale`, `SaleItem`, `Payment`,
`AuditLog`.

On the `dev` profile only, a `CommandLineRunner` seeds two demo accounts after
the migrations run. It is annotated to that profile, so `prod` gets the schema
and nothing else. That is deliberate: a seeded credential in a production
database is a real credential.

---

## The web app

Next.js App Router. Routes are grouped by who they belong to: `(auth)` for login
and registration, `admin/` for the administrator's screens, `vendedor/` for the
seller's. The URL segments are Portuguese because the interface is Portuguese,
and the folder names match what a user sees in the address bar.

Under them, three layers that each do one thing:

- **`services/`** wrap the proxy routes, one module per resource, and are the
  only place a URL string is written.
- **`hooks/`** own fetching state: loading, error, the data itself, and the
  refetch. A component asks a hook for data and never calls a service directly.
- **`components/`** render. They are split the same way the routes are, into
  `admin/`, `seller/`, `landing/`, `auth/` and a shared `ui/` built on
  shadcn/ui and Radix.

Charts come from Recharts, forms from react-hook-form with Zod schemas.

---

## A note on the build configuration

`apps/web/next.config.mjs` sets both `typescript.ignoreBuildErrors` and
`eslint.ignoreDuringBuilds` to true. That is not a recommendation, it is a
description: the production build currently succeeds while `tsc --noEmit`
reports errors, and turning the flags off is a prerequisite for trusting the
build rather than a stylistic preference.
