/** Browser persistence for TechNest. No personal or payment details are stored. */
const KEY = "technest-store-v2";
const EMPTY = { favorites: [], cart: [], overrides: { created: [], updated: {}, deleted: [] } };

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return structuredClone(EMPTY);
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      overrides: {
        created: Array.isArray(parsed.overrides?.created) ? parsed.overrides.created : [],
        updated: parsed.overrides?.updated && typeof parsed.overrides.updated === "object" ? parsed.overrides.updated : {},
        deleted: Array.isArray(parsed.overrides?.deleted) ? parsed.overrides.deleted : [],
      },
    };
  } catch {
    return structuredClone(EMPTY);
  }
}

function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    throw new Error("Unable to save in this browser. Check your storage settings.", { cause: error });
  }
  window.dispatchEvent(new Event("technest:changed"));
}

export function getFavorites() { return read().favorites; }
export function isFavorite(id) { return getFavorites().includes(Number(id)); }
export function toggleFavorite(id) {
  id = Number(id);
  const data = read();
  data.favorites = data.favorites.includes(id)
    ? data.favorites.filter(value => value !== id)
    : [...data.favorites, id];
  write(data);
  return data.favorites.includes(id);
}

export function getCart() { return read().cart; }
export function addToCart(id, count = 1) {
  id = Number(id);
  if (!Number.isFinite(id) || !Number.isInteger(count) || count < 1) return;
  const data = read();
  const item = data.cart.find(entry => entry.id === id);
  if (item) item.quantity = Math.min(99, item.quantity + count);
  else data.cart.push({ id, quantity: Math.min(99, count) });
  write(data);
}
export function setQuantity(id, quantity) {
  id = Number(id);
  quantity = Number(quantity);
  if (!Number.isInteger(quantity)) return;
  const data = read();
  data.cart = data.cart.filter(entry => entry.id !== id);
  if (quantity > 0) data.cart.push({ id, quantity: Math.min(99, quantity) });
  write(data);
}
export function clearCart() {
  const data = read();
  data.cart = [];
  write(data);
}

export function getOverrides() { return read().overrides; }
export function saveOverrides(overrides) {
  const data = read();
  data.overrides = overrides;
  write(data);
}
export function resetOverrides() {
  const data = read();
  data.overrides = structuredClone(EMPTY.overrides);
  write(data);
}
export function removeDeletedProductReferences(ids) {
  const data = read();
  const blocked = new Set(ids.map(Number));
  data.favorites = data.favorites.filter(id => !blocked.has(Number(id)));
  data.cart = data.cart.filter(item => !blocked.has(Number(item.id)));
  write(data);
}
