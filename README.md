# TechNest — Unified E-commerce (HTML, CSS & Vanilla JavaScript)

An accessible, responsive electronics store built with semantic HTML, CSS and **Vanilla JavaScript ES modules**, powered by the [DummyJSON Products API](https://dummyjson.com/docs/products).

**All text in the site is English.** Prices use USD. Checkout is simulated; no real transactions, personal information or payment details are collected.

## Run locally

1. Open this folder in VS Code.
2. Run **Live Server** with `index.html` or start a static HTTP server:

   ```bash
   python -m http.server 5500
   ```

3. Open `http://localhost:5500/`. Do not use `file://` because ES modules require an HTTP origin.
4. An internet connection is required for DummyJSON product data and images.

No frontend framework, build tool, or external runtime dependency is required.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home, curated categories, API-powered featured products |
| `pages/products.html` | Product catalogue, combined search/category filters/price sorting |
| `pages/product.html` | Product details, wishlist and add-to-cart |
| `pages/favorites.html` | LocalStorage favorites with empty state |
| `pages/cart.html` | Quantities, remove, total and simulated checkout |
| `pages/admin.html` | Create, read, update, delete (DummyJSON simulated API + local browser preview) |

## JavaScript modules

- `js/api.js`: HTTP requests, error handling, supported categories and merged product data.
- `js/storage.js`: favorites, cart, and local admin changes in `localStorage`.
- `js/ui.js`: reusable navigation, cards, formatting, accessibility labels and timed toast messages.
- `js/main.js`, `products.js`, `product-details.js`, `favorites.js`, `cart.js`, `admin.js`: page logic.

## API CRUD demonstration

Products come from four DummyJSON categories: `smartphones`, `laptops`, `tablets` and `mobile-accessories`.

| Action | HTTP request | Browser result |
| --- | --- | --- |
| Read | GET `/products/category/{slug}?limit=0` | Show products |
| Create | POST `/products/add` | New product appears locally |
| Update | PUT `/products/{id}` | Changes appear locally |
| Delete | DELETE `/products/{id}` | Product disappears locally |

**DummyJSON does not persist POST, PUT or DELETE changes.** To make the demo coherent across pages and browser refreshes, TechNest stores a client-side override in `localStorage` under `technest-store-v2`. Local products use unique IDs starting from 1000001. Updating/deleting local-only products is done in browser state; existing API products use PUT/DELETE. A **Reset local changes** button restores the original API catalogue. The reset only changes the admin overrides; wishlist and cart are separate.

### LocalStorage values

- `favorites`: product IDs.
- `cart`: `{id, quantity}` entries, with quantities up to 99.
- `overrides.created`: simulated new products.
- `overrides.updated`: changes to existing products keyed by API ID.
- `overrides.deleted`: IDs hidden from the browser preview.

No credentials, addresses, payment information, or real orders are stored.

## Loading and errors

All fetch calls go through `api.js` and check HTTP response status. Each relevant page shows loading feedback before fetching, clears it on success and displays an error on failure. Admin controls show pending Create/Update/Delete feedback, and the buttons are disabled during requests.

## Accessibility

Semantic headings, main landmarks, screen-reader status regions, labeled fields and controls, `aria-pressed` favorite buttons, focus-visible outlines, skip links, keyboard-usable menus, image alternatives, responsive layouts, and reduced-motion preferences. These are WCAG-oriented implementation choices; they are **not** a formal WCAG 2.2 AA certification. Test with keyboard and automated accessibility tooling before submission.

## Timed behavior

The shared `toast()` uses `setTimeout()` to dismiss noncritical feedback after 3.5 seconds. Important confirmation messages such as checkout remain visible on the page.

## Testing

Run:

```bash
npm test
```

The project uses Node's built-in test runner (no third-party dependencies). Browser smoke testing is recommended for mobile navigation, filtering/sorting combinations, favorites, cart quantity, checkout, and all CRUD operations.

## Assignment notes

See `docs/ASSIGNMENT.md` for the assignment, `docs/ACCEPTANCE_CHECKLIST.md` for a manual review checklist, and `docs/API_INTEGRATION.md` for the DummyJSON/LocalStorage explanation.

## Unified project provenance

This version consolidates the three submitted TechNest ZIP snapshots:
- **Existing integrated TechNest:** shared API, admin CRUD + local overrides, branding, multi-page navigation, and reusable UI components.
- **Frontend/catalogue teammate branch:** reinforced retry/loading controls and combined catalogue search, category filtering, and price sorting.
- **Shopping teammate branch:** cart item/quantity/total behaviors, favorite and product-detail flows; fixed the earlier `toggleAdd` behavior (repeated Add now increments quantity).

Integration necessarily refactors code, so this list records **feature lineage**, not line-level authorship or individual contribution claims. Confirm the final attribution with teammates before submission.

## Final review

Run `npm test`, then use `docs/ACCEPTANCE_CHECKLIST.md` for manual keyboard, responsive, mobile-menu, checkout and error-state checks. The tests do not certify WCAG 2.2 AA; browser and assistive-technology testing is required. The project uses a demo API, not an authenticated admin backend.
