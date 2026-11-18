/** Combined catalogue search, category filters and price sorting. */
import { getProducts, CATEGORIES } from "./api.js";
import { initLayout, productCard, showStatus, $ } from "./ui.js";
import { filterProducts } from "./catalogue-utils.js";
initLayout();
let products = [];
const search = $("#search");
const category = $("#category");
const sort = $("#sort");

function render() {
  const shown = filterProducts(products, {
    query: search.value,
    category: category.value,
    sort: sort.value,
  });
  $("#result-count").textContent = `(${shown.length})`;
  $("#product-grid").innerHTML = shown.map(productCard).join("");
  $("#empty-results").hidden = shown.length > 0;
}

search.addEventListener("input", render);
category.addEventListener("change", render);
sort.addEventListener("change", render);
$("#reset-filters").addEventListener("click", () => {
  search.value = ""; category.value = "all"; sort.value = "featured"; render();
});
const initialCategory = new URLSearchParams(location.search).get("category");
if (CATEGORIES.includes(initialCategory)) category.value = initialCategory;
async function loadProducts() {
  showStatus("#products-status", "Loading electronics...");
  $("#products-retry").hidden = true;
  $("#product-grid").setAttribute("aria-busy", "true");
  search.disabled = category.disabled = sort.disabled = true;
  try {
    products = await getProducts();
    showStatus("#products-status");
    render();
  } catch (error) {
    showStatus("#products-status", `Products could not be loaded: ${error.message}`, "error");
    $("#products-retry").hidden = false;
  } finally {
    search.disabled = category.disabled = sort.disabled = false;
    $("#product-grid").setAttribute("aria-busy", "false");
  }
}
$("#products-retry").addEventListener("click", loadProducts);
await loadProducts();
