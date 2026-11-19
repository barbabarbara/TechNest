import { fetchAllProducts } from "./api.js";
import { getFavorites, toggleFavorite, addToCart,} from './storage.js';

let products = [];

// Constant
const favoritesContainer = document.getElementById('favorites');
const emptyState = document.getElementById('favorites-empty');

// Function create each div of favorite (product)
function createFavoriteCard(product) {
    const isFav = getFavorites().includes(product.id);
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">Price: $${product.price}</p>
        <button type="button" class="add">Add to bag +</button>
        <button type="button" class="favorite">${isFav ? "♥" : "♡"}</button>
        <button class="details">More details</button>
        `;

    card.querySelector('.details').addEventListener('click', () => {
        window.location.href = `product.html?id=${product.id}`;
    });

    card.querySelector('.favorite').addEventListener('click', () => {
        toggleFavorite(product.id);
        renderFavorites();  
        console.log(product.id)    
    });
    
    card.querySelector('.add').addEventListener('click', () => {
    addToCart(product.id); 
    console.log(product);
    });

    return card;
}

// Export function that display favorites 
export function renderFavorites() {
    const favoriteIds = getFavorites();
    const favProducts = products.filter(p => favoriteIds.includes(p.id));

    favoritesContainer.innerHTML = '';
    emptyState.hidden = favProducts.length > 0;

    favProducts.forEach(product => {
        favoritesContainer.append(createFavoriteCard(product));
    });
}

// async function that iniciates (destructuring)
async function init() {
    try {
        const data = await fetchAllProducts();
        products = [...data.smartphones, ...data.laptops, ...data.tablets, ...data.accessories];
        renderFavorites();
    } catch (error) {
        console.error(error);
        favoritesContainer.textContent = 'Could not load your favourites.';
    }
}
init();
