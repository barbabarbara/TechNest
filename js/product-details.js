/** Individual product details, including favorite and add-to-cart controls. */
import { getProduct } from "./api.js";
import { initLayout, showStatus, $, money, escapeHTML, imageUrl } from "./ui.js";
import { isFavorite } from "./storage.js";
initLayout();
const id = Number(new URLSearchParams(location.search).get("id"));
showStatus("#detail-status", "Loading product information...");
$("#detail-retry").addEventListener("click", () => location.reload());
try {
  const product = Number.isInteger(id) && id > 0 ? await getProduct(id) : null;
  if (!product) throw new Error("Product not found.");
  const favorite = isFavorite(id);
  const soldOut = Number(product.stock) === 0;
  document.title = `${product.title} | TechNest`;
  $("#product-detail").innerHTML = `<div class="detail-layout">
    <div class="detail-photo"><img src="${escapeHTML(imageUrl(product))}" alt="${escapeHTML(product.title)}"></div>
    <div class="detail-content"><span class="eyebrow">${escapeHTML(product.brand || product.category)}</span>
      <h1>${escapeHTML(product.title)}</h1>
      <p class="detail-rating">★ ${escapeHTML(product.rating ?? "New")} <span>· ${escapeHTML(product.category.replaceAll("-", " "))}</span></p>
      <p class="detail-price">${money(product.price)}</p>
      <p class="detail-description">${escapeHTML(product.description || "Discover this electronic essential.")}</p>
      <p class="detail-stock">${soldOut ? "Currently unavailable" : `${product.stock ?? "Available"} in stock`}</p>
      <div class="detail-actions">
        <button type="button" class="button primary" data-add="${id}" ${soldOut ? "disabled" : ""}>${soldOut ? "Sold out" : "Add to cart +"}</button>
        <button type="button" class="button outline favorite-detail ${favorite ? "active" : ""}" data-fav="${id}"
          aria-pressed="${favorite}" aria-label="${favorite ? "Remove from" : "Add to"} favorites">${favorite ? "♥" : "♡"}</button>
      </div>
      <p class="small-muted">Demo store · Prices in USD · No real payments</p>
    </div></div>`;
  showStatus("#detail-status");
  $("#detail-retry").hidden = true;
} catch (error) {
  showStatus("#detail-status", `Unable to show this product: ${error.message}`, "error");
  $("#detail-retry").hidden = false;
}
