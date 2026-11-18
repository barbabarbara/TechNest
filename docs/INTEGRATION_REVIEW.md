# Unified TechNest — Integration and acceptance review

## Input projects

This package was assembled after comparing:
1. `TechNest(3).zip` — complete integrated TechNest reference.
2. `TechNest-feature-frontend-catalogue(2).zip` — teammate frontend/catalogue branch.
3. `TechNest-feature-cart-favourites(2).zip` — teammate shopping branch.

It uses the integrated implementation as the foundation, retains the group design direction and preserves the expected six-page layout. Where the branches diverged, the unified version uses a single shared API and storage model. Treat this as a proposed integration, **not proof of individual authorship**.

## Requirements coverage

| Assignment | Implementation |
| --- | --- |
| At least four HTML views | Six: home, catalogue, details, favorites, cart, administration |
| DummyJSON Fetch | `js/api.js`: four electronics category GETs via `Promise.all` |
| CRUD | `js/admin.js` and `js/api.js`: POST, GET, PUT, DELETE; local-only edits/deletes avoid invalid server requests |
| Search / category / sort together | `js/catalogue-utils.js`, `js/products.js` |
| Favorites | `js/storage.js`, `js/favorites.js` |
| Cart quantities, total and checkout | `js/cart.js`, `js/storage.js` |
| Loading and errors | Page status messages, `aria-busy`, retry controls on public pages; admin busy state |
| LocalStorage | Favorites, cart and locally simulated admin overrides |
| setTimeout | `toast()` in `js/ui.js` hides feedback after 3500ms |
| Responsive and navigation | Shared `js/ui.js`, `style.css`, `components.css`, `responsive.css` |
| Accessibility | Semantic landmarks, skip link, accessible controls and visible focus; manual WCAG audit still needed |

## Concrete improvements over the three snapshots

- Original frontend and shopping branches both edited `products.html`, `products.js` and shared CSS incompatibly. One catalogue module and one style system now own those views.
- Original shopping code used `toggleAdd()` from product cards, which could remove an already-added item; unified global handlers use `addToCart()` to increment quantity.
- Featured homepage uses two products per category rather than taking the first eight from the returned array (which could all be phones).
- Product selection logic is pure and tested; combined search/filter/sort cannot mutate the source products.
- Retry buttons and `aria-busy` states improve behavior if a fetch fails.
- Every page shares header/footer and mobile menu using `js/ui.js`, with relative links compatible with hosting under a repository subpath.
- Original API updates are applied as a LocalStorage preview so the catalogue, product details, favorites and cart share the same data.
- Final footer remains compact with a horizontal link row on desktop.

## Validation performed in the build environment

- `npm test`: 15 passing unit tests (API, local overrides, favorites, cart, catalogue helpers).
- `node --check`: JavaScript source files passed syntax checks.
- Parsed CSS files for syntax and checked local HTML style/script paths.

**Not yet verified:** Actual browser end-to-end behavior, accessibility audit including screen readers and WCAG 2.2 AA, real DummyJSON connectivity during presentation, or the combined GitHub branch merge. The browser test runner in the build environment blocked navigation to local preview pages, even for mocked requests. Use the acceptance checklist below.

## Mandatory manual acceptance sequence

1. Start Live Server from `index.html` (not from `file://`). Verify logo, mobile menu, footer and featured products.
2. Catalogue: search for a phone, choose Smartphones, sort price low-to-high and then high-to-low; ensure combined filters work; test a no-match query.
3. Favorite a product from the catalogue; open Favorites, refresh, and unfavorite it.
4. Add the same product twice and confirm quantity 2 and correct total in Cart; increase, decrease and remove it.
5. Place a demo order; confirm the thank-you message, empty cart and `$0.00` total. Confirm that no payment information was requested.
6. Admin: create a product and inspect POST in DevTools Network. Edit/delete an existing API product and inspect PUT/DELETE. Confirm browser changes persist on refresh and appear in the catalogue. Reset local product changes.
7. Disable network connectivity briefly; verify error text and Try again buttons. Re-enable and retry.
8. Verify 375px, 768px and 1440px widths for horizontal overflow, navigation, tap targets and product cards.
9. Keyboard test: Tab through navigation, filters, cards, cart, and admin; ensure focus visibility and correct form labels. Run axe DevTools and Lighthouse, and review issues manually.
10. Confirm group attribution, README, repository links, and submission requirements on GitHub. Don't merge teammates' branches without reviewing conflicts.
