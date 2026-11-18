/** Persistent favorites page, shared with all product cards. */
import { getProducts } from "./api.js";
import { getFavorites } from "./storage.js";
import { initLayout, productCard, showStatus, $ } from "./ui.js";
initLayout();
let products = [];
function render() {
  const saved = new Set(getFavorites());
  const shown = products.filter(product => saved.has(product.id));
  $("#favorites-grid").innerHTML = shown.map(productCard).join("");
  $("#favorites-empty").hidden = shown.length > 0;
}
window.addEventListener("technest:changed", render);
async function loadFavorites() {
  showStatus("#favorites-status", "Loading saved products...");
  $("#favorites-retry").hidden = true;
  $("#favorites-grid").setAttribute("aria-busy", "true");
  try {
    products = await getProducts();
    showStatus("#favorites-status");
    render();
  } catch (error) {
    showStatus("#favorites-status", `Unable to load favorites: ${error.message}`, "error");
    $("#favorites-retry").hidden = false;
  } finally {
    $("#favorites-grid").setAttribute("aria-busy", "false");
  }
}
$("#favorites-retry").addEventListener("click", loadFavorites);
await loadFavorites();
