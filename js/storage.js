// Export functions getFavorites with localStorage
export function getFavorites() {
    try {
        const stored = JSON.parse(localStorage.getItem('favorites'));
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

// Export function saveFavorites with localStorage 
export function saveFavorites (favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Export function toggleFavorites by through productId
export function toggleFavorite(productId) {
    const favorites = getFavorites();
    const updated = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];
    saveFavorites(updated);
    updatedFavCount();
    return updated.includes(productId); 
}

// Export function count favorite items (nav)
export function updatedFavCount() {
    const favCount = document.querySelector('.fav-count');
    if(favCount) {
        favCount.textContent = getFavorites().length;
    }
}

// Export function count Cart items (nav)
export function updatedBagCount() {
    const bagCount = document.querySelector('.bag-count');
    if(bagCount) {
        bagCount.textContent = getCart().length;
    }
}

// Export function getCart with localStorage
export function getCart() {
    try {
        const stored = JSON.parse(localStorage.getItem('add'));
        if (!Array.isArray(stored)) return [];

        return stored.map(i =>
            typeof i === 'object' && i !== null ? i : { id: i, quantity: 1 }
        );
    } catch {
        return [];
    }
}

// Export function saveCart with localStorage
export function saveCart (cart) {
    localStorage.setItem("add", JSON.stringify(cart));
    updatedBagCount();
}

// Export function toggleAdd through productId
export function toggleAdd (productId) {
    const cart = getCart();
    const exists = cart.some(i => i.id === productId);
    const updated = exists
        ? cart.filter(i => i.id !== productId)
        : [...cart, { id: productId, quantity: 1 }];
    saveCart(updated);
    return !exists; 
}

// Export function addtoCart through productId
export function addToCart(productId) {
    const cart = getCart();
    const exists = cart.some(i => i.id === productId);
    const updated = exists
        ? cart.map(i => i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)
        : [...cart, { id: productId, quantity: 1 }];
    saveCart(updated);
}

// Export function setQuantity through productId and quantity
export function setQuantity(productId, quantity) {
    const cart = getCart();
    const updated = quantity <= 0
        ? cart.filter(i => i.id !== productId)
        : cart.map(i => i.id === productId ? { ...i, quantity } : i);
    saveCart(updated);
}

// Function that resetCart
export function clearCart() {
    saveCart([]);
}

// EventListener update items (nav)
document.addEventListener('DOMContentLoaded', () =>{
    updatedFavCount();
    updatedBagCount();
})