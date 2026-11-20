import { getProducts } from "./api.js";
import { getCart, setQuantity, clearCart } from "./storage.js";

let products = [];

const cartItems = document.getElementById("bag");
const emptyState = document.getElementById("cart-empty");
const orderSummary = document.getElementById("order-summary");
const cartCount = document.getElementById("cart-count-detail");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout");
const confirmation = document.getElementById("order-confirmation");
 
// function to round the numbers in two decimals
function money(amount) {
  return "$" + Number(amount).toFixed(2);
}

// function loops through cart products (id, quantity)
function getCartRows() {
  const rows = [];
 
  for (const item of getCart()) {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      rows.push({ product, quantity: item.quantity });
    }
  }
 
  return rows;
}
 
// function that calculates the total amount of the product
function calculateTotals(rows) {
  let count = 0;
  let total = 0;
 
  for (const { product, quantity } of rows) {
    count += quantity;
    total += product.price * quantity;
  }
 
  return { count, total };
}

// function create list of each product in the cart.
function createRowHTML({ product, quantity }) {
  return `
    <article class="cart-item">
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="cart-item-body">
        <a href="product.html?id=${product.id}"><h3>${product.title}</h3></a>
        <span>${product.category}</span>
        <strong>${money(product.price)}</strong>
        <div class="quantity">
          <button data-action="decrease" data-id="${product.id}">−</button>
          <span>${quantity}</span>
          <button data-action="increase" data-id="${product.id}">+</button>
          <button data-action="remove" data-id="${product.id}">Remove</button>
        </div>
      </div>
      <strong>${money(product.price * quantity)}</strong>
    </article>`;
}

// function display cart content
function render() {
  const rows = getCartRows();
  const { count, total } = calculateTotals(rows);
  const isEmpty = rows.length === 0;
 
  emptyState.hidden = !isEmpty;
  orderSummary.hidden = isEmpty;
 
  cartItems.innerHTML = rows.map(createRowHTML).join("");
  cartCount.textContent = count;
  cartTotal.textContent = money(total);
}

// function shows hidden div with a confirmation
function showConfirmation() {
  confirmation.hidden = false;
  confirmation.innerHTML = `
    <div class="success-panel">
      <h2>&#10003; Thank you for your order!</h2>
      <p>Your purchase is complete. No payment has been processed.</p>
      <a href="products.html">Keep exploring</a>
    </div>`;
}

// Quantity handle buttons 
function getNewQuantity(action, currentQuantity) {
  if (action === "increase") return currentQuantity + 1;
  if (action === "decrease") return currentQuantity - 1;
  if (action === "remove") return 0;
  return currentQuantity;
}

// Check cart-clicks function 
function handleCartClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  const item = getCart().find((i) => i.id === id);
  if (!item) return;

  setQuantity(id, getNewQuantity(action, item.quantity));
  render();
}
 
// Checkout function.
function handleCheckout() {
  if (getCart().length === 0) return;
 
  clearCart();
  render();
  showConfirmation();
}

// EventListeners 
cartItems.addEventListener("click", handleCartClick);
checkoutBtn.addEventListener("click", handleCheckout);
 
// Iniciates async function
async function init() {
    try {
        products = await getProducts();
        render();
    } catch (error) {
        console.error(error);
        favoritesContainer.textContent = 'Unable to load your cart right now.';
    }
}
init();
 
