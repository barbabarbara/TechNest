import test from 'node:test';
import assert from 'node:assert/strict';

const store = new Map();
globalThis.localStorage = {
  getItem: key => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, value),
};
globalThis.window = { dispatchEvent() {} };
globalThis.Event = class { constructor(type) { this.type = type; } };
const calls = [];
const samples = {
  smartphones: [{ id: 1, category: 'smartphones', title: 'Phone', price: 100 }],
  laptops: [{ id: 2, category: 'laptops', title: 'Laptop', price: 400 }],
  tablets: [{ id: 3, category: 'tablets', title: 'Tablet', price: 200 }],
  'mobile-accessories': [{ id: 4, category: 'mobile-accessories', title: 'Case', price: 10 }],
};
globalThis.fetch = async (url, options = {}) => {
  calls.push({ url, options });
  const category = String(url).match(/category\/([^?]+)/)?.[1];
  let result;
  if (category) result = { products: samples[category] };
  else if (String(url).endsWith('/add')) result = { id: 195, ...JSON.parse(options.body) };
  else if (options.method === 'PUT' && String(url).endsWith('/999')) return { ok: false, status: 404 };
  else if (options.method === 'PUT') result = { id: Number(String(url).split('/').at(-1)), ...JSON.parse(options.body) };
  else if (options.method === 'DELETE') result = { id: Number(String(url).split('/').at(-1)), isDeleted: true };
  else return { ok: false, status: 404 };
  return { ok: true, json: async () => result };
};
const api = await import('../js/api.js');
const storage = await import('../js/storage.js');

test('four categories fetched concurrently and merged', async () => {
  const products = await api.getProducts({ fresh: true });
  assert.equal(products.length, 4);
  assert.equal(calls.filter(c => c.options.method === undefined).length, 4);
  assert.ok(calls.some(c => c.url.includes('/mobile-accessories?limit=0')));
});
test('local overrides affect the whole product catalogue', async () => {
  storage.saveOverrides({
    created: [{ id: 1000001, category: 'laptops', title: 'New', price: 900 }],
    updated: { 1: { price: 120 } },
    deleted: [4],
  });
  const products = await api.getProducts();
  assert.equal(products.length, 4);
  assert.equal(products.find(p => p.id === 1).price, 120);
  assert.equal(products.find(p => p.id === 1000001).title, 'New');
  assert.equal(products.find(p => p.id === 4), undefined);
  assert.equal((await api.getProduct(1000001)).title, 'New');
  storage.resetOverrides();
});
test('POST, PUT and DELETE use expected methods and URLs', async () => {
  await api.createProduct({ title: 'Demo' });
  await api.updateProduct(1, { price: 99 });
  await api.deleteProduct(1);
  assert.ok(calls.some(c => c.url.endsWith('/add') && c.options.method === 'POST'));
  assert.ok(calls.some(c => c.url.endsWith('/1') && c.options.method === 'PUT'));
  assert.ok(calls.some(c => c.url.endsWith('/1') && c.options.method === 'DELETE'));
});
test('HTTP failures reject with a helpful message', async () => {
  await assert.rejects(api.updateProduct(999, {}), /HTTP 404/);
});
