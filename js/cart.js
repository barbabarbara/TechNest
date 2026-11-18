/** Cart and simulated checkout; no payment or personal data collected. */
import { getProducts } from "./api.js";
import { getCart, setQuantity, clearCart } from "./storage.js";
import { initLayout, showStatus, $, money, escapeHTML, imageUrl } from "./ui.js";
initLayout();
let products = [];
let purchased = false;

function render() {
  const rows = getCart().map(item => ({ item, product: products.find(p => p.id === item.id) }))
    .filter(({ product }) => Boolean(product));
  const count = rows.reduce((sum, { item }) => sum + item.quantity, 0);
  const total = rows.reduce((sum, { item, product }) => sum + Number(product.price) * item.quantity, 0);
  $("#cart-empty").hidden = rows.length > 0 || purchased;
  $("#order-summary").hidden = rows.length === 0;
  $("#cart-items").innerHTML = rows.map(({ item, product }) => `<article class="cart-item">
    <img src="${escapeHTML(imageUrl(product))}" alt="${escapeHTML(product.title)}" loading="lazy">
    <div class="cart-item-body">
      <a href="product.html?id=${encodeURIComponent(product.id)}"><h3>${escapeHTML(product.title)}</h3></a>
      <span class="small-muted">${escapeHTML(product.category.replaceAll("-", " "))}</span>
      <strong>${money(product.price)}</strong>
      <div class="quantity" aria-label="Quantity controls for ${escapeHTML(product.title)}">
        <button type="button" data-qty="${product.id}" data-delta="-1" aria-label="Decrease quantity of ${escapeHTML(product.title)}">−</button>
        <span aria-live="polite">${item.quantity}</span>
        <button type="button" data-qty="${product.id}" data-delta="1" ${item.quantity >= 99 ? "disabled" : ""} aria-label="Increase quantity of ${escapeHTML(product.title)}">+</button>
        <button class="remove-item" type="button" data-remove="${product.id}" aria-label="Remove ${escapeHTML(product.title)}">Remove</button>
      </div>
    </div><strong>${money(Number(product.price) * item.quantity)}</strong>
  </article>`).join("");
  $("#cart-count-detail").textContent = count;
  $("#cart-total").textContent = money(total);
}

$("#cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-qty], [data-remove]");
  if (!button) return;
  const id = Number(button.dataset.qty || button.dataset.remove);
  const item = getCart().find(entry => entry.id === id);
  if (!item) return;
  try {
    setQuantity(id, button.dataset.remove ? 0 : item.quantity + Number(button.dataset.delta));
    purchased = false;
    render();
  } catch (error) { showStatus("#cart-status", error.message, "error"); }
});
$("#checkout").addEventListener("click", () => {
  if (!getCart().length || !products.length) return;
  try {
    clearCart();
    purchased = true;
    render();
    const confirmation = $("#order-confirmation");
    confirmation.hidden = false;
    confirmation.innerHTML = `<div class="success-panel"><h2>✓ Thank you for your order!</h2>
      <p>Your demo order is complete. No payment has been processed and no personal information was collected.</p>
      <a href="products.html" class="button primary">Keep exploring →</a></div>`;
    confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) { showStatus("#cart-status", error.message, "error"); }
});
window.addEventListener("technest:changed", () => {
  if (purchased && getCart().length) {
    purchased = false;
    $("#order-confirmation").hidden = true;
  }
  render();
});
async function loadCart() {
  showStatus("#cart-status", "Loading cart products...");
  $("#cart-retry").hidden = true;
  $("#cart-items").setAttribute("aria-busy", "true");
  try {
    products = await getProducts();
    showStatus("#cart-status");
    render();
  } catch (error) {
    showStatus("#cart-status", `Unable to load your cart: ${error.message}`, "error");
    $("#cart-retry").hidden = false;
  } finally {
    $("#cart-items").setAttribute("aria-busy", "false");
  }
}
$("#cart-retry").addEventListener("click", loadCart);
await loadCart();
