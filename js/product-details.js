import { getProducts } from "./api.js";
import { getFavorites, toggleFavorite, addToCart} from './storage.js';

// Constant 
const productDetail = document.querySelector(".product-detail");
  
// Function create product details (div) 
function createDetailHTML(p, isFav) {
  return `
    <div class="detail-layout">
      <div class="detail-photo">
        <img src="${p.thumbnail}" alt="${p.title}">
      </div>
      <div class="detail-content">
        <p class="detail-rating">★ ${p.rating}</p>
        <span class="category">${p.category}</span>
        <h1>${p.title}</h1>
        <p class="detail-price">$${Number(p.price).toFixed(2)}</p>
        <p class="detail-description">${p.description || ""}</p>
        <div class="detail-actions">
          <button type="button" class="add">Add to bag +</button>
          <button type="button" class="favorite">${isFav ? "♥" : "♡"}</button>
        </div>
        <p class="message"></p>
      </div>
    </div>`;
}

// Function that shows the selected product details
function showProduct(p) {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = createDetailHTML(p, getFavorites().includes(p.id));

  const favBtn = div.querySelector(".favorite");
  const message = div.querySelector(".message");

  div.querySelector(".add").addEventListener("click", () => {
    addToCart(p.id);
    console.log(p)
    message.textContent = "Added to bag!";
  });

  favBtn.addEventListener("click", () => {
    toggleFavorite(p.id);
    console.log(p)
    message.textContent = "Added to favourites!"
    favBtn.textContent = getFavorites().includes(p.id) ? "♥" : "♡";
  });

  productDetail.replaceChildren(div);
}

// iniciates (LocalStorage)
async function init() {
  const id = Number(new URLSearchParams(location.search).get("id"));

  if (!id) {
    productDetail.textContent = "No product selected.";
    return;
  }

  try {
    const products = await getProducts();
    const product = products.find((p) => p.id === id);

    if (product) {
      showProduct(product);
    } else {
      productDetail.textContent = "Product not found.";
    }
  } catch (error) {
    console.error(error);
    productDetail.textContent = "Could not load product.";
  }
}

init();

