/** DummyJSON API and the local overlay for simulated product mutations. */
import { getOverrides } from "./storage.js";

export const CATEGORIES = Object.freeze([
  "smartphones", "laptops", "tablets", "mobile-accessories",
]);
const API_URL = "https://dummyjson.com/products";
let baseProducts = null;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) throw new Error(`DummyJSON request failed (HTTP ${response.status}).`);
  const data = await response.json();
  if (!data || typeof data !== "object") throw new Error("Unexpected response from DummyJSON.");
  return data;
}

export async function getProducts({ fresh = false } = {}) {
  if (!baseProducts || fresh) {
    const results = await Promise.all(CATEGORIES.map(async category => {
      const data = await request(`/category/${category}?limit=0`);
      if (!Array.isArray(data.products)) throw new Error("Unexpected API response.");
      return data.products;
    }));
    baseProducts = results.flat();
  }
  const { created, updated, deleted } = getOverrides();
  const removed = new Set(deleted.map(Number));
  return [
    ...baseProducts.filter(product => !removed.has(product.id))
      .map(product => ({ ...product, ...(updated[product.id] || {}) })),
    ...created.filter(product => !removed.has(product.id)),
  ];
}

export async function getProduct(id) {
  id = Number(id);
  if (!Number.isInteger(id)) return null;
  return (await getProducts()).find(product => product.id === id) || null;
}

const jsonOptions = (method, data) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const createProduct = data => request("/add", jsonOptions("POST", data));
export const updateProduct = (id, data) => request(`/${encodeURIComponent(id)}`, jsonOptions("PUT", data));
export const deleteProduct = id => request(`/${encodeURIComponent(id)}`, { method: "DELETE" });

// Compatibility for the original TechNest admin module naming.
export async function fetchAllProducts() {
  const all = await getProducts();
  return {
    smartphones: all.filter(product => product.category === "smartphones"),
    laptops: all.filter(product => product.category === "laptops"),
    tablets: all.filter(product => product.category === "tablets"),
    "mobile-accessories": all.filter(product => product.category === "mobile-accessories"),
  };
}
export const fetchProductById = getProduct;
