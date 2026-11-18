# API and integration notes

The API functions use `async`/`await`, `fetch()`, `response.ok` and `Promise.all`.

- Four GET category requests run concurrently using `Promise.all`.
- The storefront uses `getProducts()` for consistent admin changes, favorites and cart.
- `getProduct(id)` resolves a product from the current merged dataset, allowing locally created products to have detail pages.
- `POST /products/add`, `PUT /products/{id}` and `DELETE /products/{id}` are simulated by DummyJSON.
- A persistent browser-only overlay is stored in LocalStorage, not on DummyJSON servers.
- Locally created items have IDs >= 1000001 and are modified within the browser overlay; they are not valid server records.
- Delete confirms the action, waits for the simulated HTTP response (when original item), then updates the local view.
- Reset admin changes restores the API catalogue. Favorites/cart are not reset.
- If an item is removed through admin, cart and favorite references to it are removed from the same browser.

## API endpoints

```text
GET     https://dummyjson.com/products/category/smartphones?limit=0
GET     https://dummyjson.com/products/category/laptops?limit=0
GET     https://dummyjson.com/products/category/tablets?limit=0
GET     https://dummyjson.com/products/category/mobile-accessories?limit=0
POST    https://dummyjson.com/products/add
PUT     https://dummyjson.com/products/{id}
DELETE  https://dummyjson.com/products/{id}
```

The UI uses an overlay to make mutations visible after refresh. No real backend, authorization, or administrative security is claimed. The Admin page is a course demonstration rather than a protected real-world dashboard.
