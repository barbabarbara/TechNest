import test from "node:test";
import assert from "node:assert/strict";
import { selectFeatured, filterProducts } from "../js/catalogue-utils.js";

const products = [
  { id: 1, title: "Orion phone", category: "smartphones", price: 300 },
  { id: 2, title: "Nova phone", category: "smartphones", price: 200 },
  { id: 3, title: "Studio laptop", category: "laptops", price: 850 },
  { id: 4, title: "Pocket tablet", category: "tablets", price: 240 },
  { id: 5, title: "Travel charger", category: "mobile-accessories", price: 30 },
];

test("featured products cover each electronics category", () => {
  const chosen = selectFeatured(products, 1);
  assert.deepEqual(chosen.map(p => p.category), [
    "smartphones", "laptops", "tablets", "mobile-accessories",
  ]);
});

test("title search, category filter, and price sort work together", () => {
  const shown = filterProducts(products, { query: "PHONE", category: "smartphones", sort: "low" });
  assert.deepEqual(shown.map(p => p.id), [2, 1]);
});

test("descending price sort does not mutate original product array", () => {
  const shown = filterProducts(products, { sort: "high" });
  assert.equal(shown[0].id, 3);
  assert.deepEqual(products.map(p => p.id), [1, 2, 3, 4, 5]);
});

test("empty state for no matching products", () => {
  assert.deepEqual(filterProducts(products, { query: "does-not-exist" }), []);
});
