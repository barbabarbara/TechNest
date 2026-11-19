import { fetchAllProducts } from "./api.js";
import { getFavorites, toggleFavorite, addToCart } from "./storage.js";

let products = [];

const productContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("category");
const sortPrice = document.getElementById("sort");
const resetCategory = document.getElementById("reselt-filters")

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

// Function with search, filter and sort products
function updatedCatalogue() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = filterCategory.value;
    const sort = sortPrice.value;

    let result = products.filter(product => {
        const equalSearch = product.title.toLowerCase().includes(searchText);
        const equalCategory = category === 'all' || product.category === category;
        return equalSearch && equalCategory;
    });

    if (sort === 'low') {
        result = result.toSorted((a, b) => a.price - b.price);
    } else if (sort === 'high') {
        result = result.toSorted((a, b) => b.price - a.price);
    }

    displayProducts(result);
    console.log(result)
}
// Eventlisteners
searchInput.addEventListener('input', updatedCatalogue);
filterCategory.addEventListener('change', updatedCatalogue);
sortPrice.addEventListener('change', updatedCatalogue);
resetCategory.addEventListener("click", () => {
  searchInput.value = "";
  filterCategory.value = "all";
  sortPrice.value = "default";

  updatedCatalogue();
});  

// Function create each div card with product info.
function productCard(product) {
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

    const favBtn = card.querySelector('.favorite');
    favBtn.addEventListener('click', () => {
        toggleFavorite(product.id);
        // console.log(product);
        let newFav = getFavorites().includes(product.id);
        favBtn.classList.toggle('active', newFav);
        favBtn.textContent = newFav ? "♥" : "♡";
    });

    card.querySelector('.add').addEventListener('click', () => {
        addToCart(product.id);
        console.log(product);
    })

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

