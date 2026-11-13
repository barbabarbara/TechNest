import { fetchAllProducts} from "./api.js";

const productContainer = document.querySelector(".products");
let products = [];

//  Get favorites (LocalStorage)
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function toggleFavorite(id) {
    let favs = getFavorites();

    if (favs.includes(id)) {
        favs = favs.filter(favId => favId !== id);
    } else {
        favs.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
}

// Function that display products 
function displayProducts(products) {
    productContainer.innerHTML = '';

    if(products.length === 0) {
        productContainer.innerHTML = '<p>No products available.</p>';
        return;
    }
        products.forEach(product => {
        productContainer.append(productCard(product));
        
    });
}

function productCard(product) {
    const isFav = getFavorites().includes(product.id);
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">Price: $${product.price}</p>
        <button class="favorite ${isFav ? 'active' : ''}">
        ${isFav ? 'Your Favourite' : 'Favourite'}
        </button>
        `;
    const favBtn = card.querySelector('.favorite');
    favBtn.addEventListener('click', () => {
        toggleFavorite(product.id);
        let newFav = getFavorites().includes(product.id);
        favBtn.classList.toggle('active', newFav);
        favBtn.textContent = newFav ? ' Your Favorite' : 'Favorite';
    });

    return card;
}

fetchAllProducts()
  .then((data) => {
    products = [
      ...data.smartphones,
      ...data.laptops,
      ...data.tablets,
      ...data.accessories,
    ];
    displayProducts(products);
  })
  .catch((err) => {
    console.error("Fetch failed:", err);
    productContainer.innerHTML = "<p>Could not load products.</p>";
  });