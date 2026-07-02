# EasyBuy

A small e-commerce storefront built with Next.js (App Router) against the
[DummyJSON](https://dummyjson.com/products) product API — a product grid,
a product detail page, and a persistent cart.

## Running locally

Requires Node 18.18+ (built and tested on Node 24).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment
variables or API keys are needed — the app calls the public DummyJSON API
directly.

Other useful scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Pages

- `/` — product grid, fetched server-side from `GET /products`
- `/products/[id]` — product detail, fetched server-side from
  `GET /products/{id}`
- `/cart` — client-side cart view (add/remove/quantity, totals)

## Thought process & trade-offs

**Server Components for data, Client Components for interaction.** The
home and detail pages are Server Components that `await fetch` directly —
no client-side loading spinners for the initial product data, and no API
route of my own needed since DummyJSON is public and keyless. Anything
that needs state or event handlers (the header's cart badge, add-to-cart
buttons, the quantity stepper, the whole cart page) is pushed into small
`"use client"` components instead of promoting entire pages to client
components, to keep the client JS bundle and hydration cost small.

**Cart state: Context + localStorage, not a library.** The assignment
allowed Context, Zustand, or localStorage; I used React Context as the
sharing mechanism (so `Header`, the product pages, and the cart page all
see the same state) backed by `localStorage` for persistence across
reloads and tabs closing. A dedicated library (Zustand, Redux) felt like
overkill for one piece of shared state with four operations
(add/remove/set quantity/read totals) — Context is standard-library and
sufficient here. The trade-off: every consumer of `CartContext`
re-renders on any cart change, which is fine at this scale but wouldn't
scale to a cart with many independent widgets reading it.

**Hydration-safe persistence.** Reading `localStorage` during the first
render would make the server-rendered HTML (which has no `localStorage`)
disagree with the client's first paint. `CartContext` reads storage inside
a `useEffect` (after mount) and gates the "save to storage" effect behind
a `hydrated` flag, so the initial empty-cart render always matches between
server and client, and the real cart data appears one tick later instead
of causing a hydration mismatch or clobbering stored data on load.

**Design system over default styling.** Rather than leaving the default
create-next-app look, I built a small token system (colors, three Google
fonts via `next/font`) and one recurring signature element — prices render
as a rotated "swing tag" chip with a die-cut hole — reused across the
product grid, detail page, and cart line items, since price is the one
thing every screen in an e-commerce app is fundamentally about.

**Tailwind, plus a `cn()` helper for conditional classes.** Styling is
plain Tailwind utility classes in JSX, with one small addition:
`src/lib/cn.ts` wraps `clsx` + `tailwind-merge` so components with a
variant or two (`PriceTag`'s size/sale/on-paper flags, the "Added" state
on the add-to-cart buttons) build their class string declaratively
instead of manual `.filter(Boolean).join(" ")` or template-literal
ternaries. It's deliberately not `class-variance-authority` or a
component library — two components with a couple of boolean flags each
don't need a variants API, and pulling in Ant Design/MUI would fight the
custom price-tag identity already in place. Repeated non-conditional
styling (the price tag itself, the receipt-style dashed dividers) lives
as named classes in `globals.css` instead of being copy-pasted as
Tailwind strings.

**Quantity and remove logic live in the cart context, not the UI.**
`setQuantity(id, 0-or-less)` removes the item rather than leaving a
0-quantity row, so the cart page and any future "buy again" widget can't
disagree about what "0 in cart" means.

## Known limitations

- **No checkout.** The assignment scope is browse → detail → cart; there's
  no payment or order flow.
- **No pagination or search on the product grid** — it loads a fixed batch
  (30) of products from DummyJSON in one request. DummyJSON supports
  `limit`/`skip` for pagination and a `/products/search` endpoint; neither
  is wired up.
- **Cart persistence is per-browser, not per-account.** There's no login,
  so `localStorage` is keyed globally (`easy-buy-cart`) — clearing browser
  storage or switching browsers loses the cart, and it isn't synced
  anywhere.
- **No automated tests.** Verified manually in-browser (add/remove/adjust
  quantity, reload persistence, empty-cart state, mobile layout) but there
  is no unit/integration test suite.
- **No dedicated loading/error UI.** There's no `loading.tsx` skeleton for
  the product grid, and a failed DummyJSON request currently surfaces
  Next.js's default error page rather than a designed error state.
- **Discount math assumes DummyJSON's shape.** The "original price" shown
  struck through on the detail page is derived as
  `price / (1 - discountPercentage / 100)`, which matches how DummyJSON's
  `price` field behaves today; it isn't a general-purpose pricing model.
