import test from 'node:test';
import assert from 'node:assert/strict';

const map = new Map();
globalThis.localStorage = {
  getItem: key => map.has(key) ? map.get(key) : null,
  setItem: (key, value) => map.set(key, value),
};
globalThis.window = { dispatchEvent: () => {} };
globalThis.Event = class { constructor(type) { this.type = type; } };
const storage = await import('../js/storage.js');

function reset() { map.clear(); }
test('favorite toggle persists and can be removed', () => {
  reset();
  assert.equal(storage.toggleFavorite(5), true);
  assert.deepEqual(storage.getFavorites(), [5]);
  assert.equal(storage.toggleFavorite(5), false);
  assert.deepEqual(storage.getFavorites(), []);
});
test('adding an existing product increments quantity', () => {
  reset();
  storage.addToCart(42);
  storage.addToCart(42);
  assert.deepEqual(storage.getCart(), [{ id: 42, quantity: 2 }]);
});
test('changing quantity and clearing cart', () => {
  reset();
  storage.addToCart(8);
  storage.setQuantity(8, 3);
  assert.equal(storage.getCart()[0].quantity, 3);
  storage.setQuantity(8, 0);
  assert.equal(storage.getCart().length, 0);
  storage.addToCart(8);
  storage.clearCart();
  assert.deepEqual(storage.getCart(), []);
});
test('quantity is capped at 99', () => {
  reset(); storage.addToCart(8, 100);
  storage.addToCart(8, 10);
  assert.equal(storage.getCart()[0].quantity, 99);
});
test('product overrides persist and reset without affecting favorites', () => {
  reset();
  storage.toggleFavorite(10);
  storage.saveOverrides({ created: [{ id: 1000001, title: 'Demo' }], updated: {}, deleted: [9] });
  assert.equal(storage.getOverrides().created[0].title, 'Demo');
  storage.resetOverrides();
  assert.deepEqual(storage.getOverrides(), { created: [], updated: {}, deleted: [] });
  assert.deepEqual(storage.getFavorites(), [10]);
});
test('corrupted localStorage recovers safely', () => {
  reset();
  map.set('technest-store-v2', '{invalid-json');
  assert.deepEqual(storage.getCart(), []);
  assert.deepEqual(storage.getFavorites(), []);
});
test('deleted product references are removed from cart and favorites', () => {
  reset(); storage.addToCart(7); storage.toggleFavorite(7); storage.toggleFavorite(8);
  storage.removeDeletedProductReferences([7]);
  assert.deepEqual(storage.getCart(), []);
  assert.deepEqual(storage.getFavorites(), [8]);
});
