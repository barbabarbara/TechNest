/** Pure helpers for catalogue selection, search, filtering and sorting. */
export const ELECTRONICS_CATEGORIES = Object.freeze([
  "smartphones", "laptops", "tablets", "mobile-accessories",
]);

/** Feature at most two products from each category for a balanced homepage. */
export function selectFeatured(products, perCategory = 2) {
  return ELECTRONICS_CATEGORIES.flatMap(category =>
    products.filter(product => product.category === category).slice(0, perCategory)
  );
}

/** Apply title search and category filter together, then sort the result. */
export function filterProducts(products, { query = "", category = "all", sort = "featured" } = {}) {
  const needle = String(query).trim().toLocaleLowerCase("en");
  const result = products.filter(product =>
    (category === "all" || product.category === category) &&
    String(product.title || "").toLocaleLowerCase("en").includes(needle)
  );
  if (sort === "low") result.sort((a, b) => a.price - b.price);
  else if (sort === "high") result.sort((a, b) => b.price - a.price);
  else if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));
  return result;
}
