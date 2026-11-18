/** Homepage: showcase one or two picks from each electronics category. */
import { getProducts } from "./api.js";
import { selectFeatured } from "./catalogue-utils.js";
import { initLayout, productCard, showStatus, $ } from "./ui.js";

initLayout();

async function loadFeatured() {
  showStatus("#featured-status", "Loading featured electronics...");
  $("#featured-retry").hidden = true;
  $("#featured-products").setAttribute("aria-busy", "true");
  try {
    const products = await getProducts();
    const featured = selectFeatured(products);
    $("#featured-products").innerHTML = featured.map(productCard).join("");
    showStatus("#featured-status", featured.length ? "" : "No featured products are available.");
  } catch (error) {
    showStatus("#featured-status", `Could not load featured products: ${error.message}`, "error");
    $("#featured-retry").hidden = false;
  } finally {
    $("#featured-products").setAttribute("aria-busy", "false");
  }
}

$("#featured-retry").addEventListener("click", loadFeatured);
await loadFeatured();
