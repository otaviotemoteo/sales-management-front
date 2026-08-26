# Sales Management

A place with waiters running tabs usually keeps three separate records of the
same night: a card terminal that knows the payments, a pad of paper that knows
the orders, and somebody's head that knows who is still owed money. None of them
agree by closing time. This replaces the paper: a seller registers the customer,
puts the sale together on screen, and it lands in one place with the items, the
total, how it was paid and whether it has actually been paid yet.

**In one sentence:** a sale gets recorded once, by the person who made it, and
the owner can see all of them without asking anyone.

---

## What it's for

The problem is not that the numbers are hard. It is that they live in three
places that never get reconciled. A customer says they already paid and nobody
can check. A waiter wants to know how they did this month and the honest answer
is that nobody knows. The owner wants to know which product actually moves and
has to count paper. Every one of those is a question the business already has
the data to answer, scattered across records that were never designed to be
compared.

The trade is that this records payments, it does not process them. Every sale
carries a method (PIX, cash, debit, credit) and a payment status, and marking a
sale as settled is something a person does after the money moved somewhere else.
It does not talk to a card terminal, does not open a PIX charge, and holds no
money. The terminal stays. What goes away is the second, unreliable record of
what the terminal already did, and the reason to build it this way is that
handling money is a licensing and compliance problem, not a coding one, and
pretending otherwise in a project this size would be dishonest.

The second trade is the one visible in the interface. The sale flow was built
before the analytics, and the analytics show it. Recording a sale is complete and
careful: customer search, product selection, quantities, discount, payment method,
status, and a receipt view afterwards. The reporting on top of that is real but
younger, and one number in it, a seller rating, is a placeholder that has always
shown zero because nothing rates anyone. It is in the interface and it is not a
feature. Everything else on those screens comes from actual sales.

## What you actually do with it

**Once, at the start.** The owner signs in as the administrator, puts the product
catalogue in with prices and stock, and creates an account for each seller. A
seller receives an account without a password, chooses one on first sign-in, and
fills in their profile before reaching the app.

**Every shift, if you are a seller.** You look up the customer or register them
in the same flow, add products with quantities, apply a discount if there is one,
pick how they paid, and save. The sale is yours from that moment: it carries your
name, and your dashboard and performance page are built from your sales and
nobody else's. You can pull any customer's statement for the last twelve months,
which is the answer to "did I already pay you".

**Every day, if you own the place.** You see every sale from every seller,
filtered by status, person or period, see what is still unpaid and mark it
settled when it is, keep the catalogue and the stock, and activate or deactivate
sellers as people come and go. The reports page puts revenue, payment method
distribution, the sales trend and the top products in one screen, filtered by
period and seller, and exports what you are looking at as a CSV.

## The ideas behind it

- **A seller's own sales are not a filter, they are the only query available.**
  The seller-facing endpoint takes no seller id. It resolves who you are from
  your token and asks with that, so there is no parameter in which to request
  somebody else's sales, and therefore none to get wrong.
- **The price on a line is the price at the time, and cancelling is a status.** A
  sale item stores the unit price it was sold at rather than pointing at the
  product's current one, because changing a price tomorrow must not silently
  rewrite what last month earned. A cancelled sale stays in the record for the
  same reason: what was attempted is part of what happened.
- **The browser never learns where the API is.** Every request goes through the
  app's own server, which holds the token and the address, so the session cookie
  is unreadable by any script on the page and the backend needs no public
  address at all.

## Who can use it

Two roles, with genuinely different scopes rather than one being a smaller
version of the other.

**Sellers** register customers, create sales, look up a customer's statement, and
see their own sales and their own performance. They cannot see another seller's
sales, cannot touch the product catalogue, and cannot manage anyone's account but
their own profile.

**Administrators** see every sale from everyone, manage the payment status of all
of them, own the product catalogue, create and deactivate sellers, and read the
reports.

Accounts are created by an administrator. A new seller is created without a
password and sets one the first time they sign in, so no credential is ever
typed by one person on behalf of another.

## Where the data goes

One PostgreSQL database, plus Redis holding cached aggregates that can be thrown
away without losing anything. Passwords are hashed, sessions are JWTs in
HTTP-only cookies, and an audit log records who changed which record. There is no
third-party service anywhere in the path: no payment provider, no analytics, no
external API. Everything runs wherever you run the containers.

---

## For developers

| Document | What's in it |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Both applications, the request path, how the roles are enforced in three places, the sale model, caching and data |
| [`docs/SETUP.md`](docs/SETUP.md) | Running everything or one half, environment variables, demo accounts, troubleshooting |
| [`docs/TESTING.md`](docs/TESTING.md) | End-to-end checklist across both roles |

```bash
cp .env.example .env
docker compose up
```

Web on `http://localhost:3000`, API on `http://localhost:8080/api`, Swagger at
`/api/swagger-ui.html`. Migrations and the development seed run inside the API
container's startup, so there is no third command.

```
apps/web/   Next.js 15, TypeScript, Tailwind, shadcn/ui, Recharts
apps/api/   Spring Boot 3, Java 17, PostgreSQL with Flyway, Redis, JWT
```

`apps/api` was brought in with `git subtree`, so the backend's commit history is
part of this repository rather than a single import.
