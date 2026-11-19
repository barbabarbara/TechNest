import { isFavorite, toggleFavorite, addToCart, getFavorites, getCart } from './storage.js';

const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', function () {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.addEventListener('click', closeMenu);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

export const categories = {
  laptops: 'Laptops',
  smartphones: 'Smartphones',
  tablets: 'Tablets',
  'mobile-accessories': 'Accessories'
};

export function showProducts(products, container, detailPage) {
  container.replaceChildren();

  for (const product of products) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a class="product-link">
        <img alt="" loading="lazy">
        <div class="product-content">
          <p class="product-category"></p>
          <h3></h3>
          <strong></strong>
          <span>View product →</span>
        </div>
      </a>
      <div class="product-actions">
        <button class="favorite-button" type="button"></button>
        <button class="cart-button" type="button">Add to cart</button>
      </div>`;

    card.querySelector('a').href = detailPage + '?id=' + product.id;
    card.querySelector('h3').textContent = product.title;
    card.querySelector('.product-category').textContent = categories[product.category];
    card.querySelector('strong').textContent = product.price.toFixed(2) + ' USD';

    const image = card.querySelector('img');
    image.src = product.thumbnail;
    image.addEventListener('error', function () {
      image.hidden = true;
    });

    const favoriteButton = card.querySelector('.favorite-button');
    favoriteButton.dataset.fav = product.id;
    setFavoriteButton(favoriteButton, product);
    favoriteButton.addEventListener('click', function () {
      try {
        const saved = toggleFavorite(product.id);
        setFavoriteButton(favoriteButton, product);
        showFeedback(saved ? 'Added to favorites.' : 'Removed from favorites.');
      } catch (error) {
        showFeedback(error.message);
      }
    });

    const cartButton = card.querySelector('.cart-button');
    cartButton.dataset.add = product.id;
    cartButton.setAttribute('aria-label', 'Add ' + product.title + ' to cart');
    if (product.stock === 0) {
      cartButton.disabled = true;
      cartButton.textContent = 'Sold out';
    }
    cartButton.addEventListener('click', function () {
      try {
        addToCart(product.id);
        showFeedback('Added to cart.');
      } catch (error) {
        showFeedback(error.message);
      }
    });

    container.append(card);
  }
}

function setFavoriteButton(button, product) {
  const saved = isFavorite(product.id);
  button.textContent = saved ? 'Saved ♥' : 'Favorite ♡';
  button.setAttribute('aria-pressed', String(saved));
  button.setAttribute('aria-label', (saved ? 'Remove from favorites: ' : 'Add to favorites: ') + product.title);
}

let feedbackTimer;
function showFeedback(message) {
  const status = document.querySelector('#action-status');
  status.textContent = message;
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(function () {
    status.textContent = '';
  }, 3500);
}

function updateCounts() {
  document.querySelector('#favorite-count').textContent = getFavorites().length;
  let count = 0;
  for (const item of getCart()) count += item.quantity;
  document.querySelector('#cart-count').textContent = count;
}

window.addEventListener('technest:changed', updateCounts);
updateCounts();
