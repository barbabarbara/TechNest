const productList = document.querySelector('#product-list');
const statusText = document.querySelector('#status');
const retryButton = document.querySelector('#retry');
const form = document.querySelector('#catalog-form');
let products = [];

function updateProducts() {
  if (!form) {
    const featured = [];
    for (const category of Object.keys(categories)) {
      const product = products.find(function (product) {
        return product.category === category;
      });
      if (product) featured.push(product);
    }
    showProducts(featured, productList, 'pages/product.html');
    statusText.textContent = 'Utvalda produkter från våra kategorier.';
    if (featured.length === 0) statusText.textContent = 'Inga produkter att visa.';
    return;
  }

  const search = document.querySelector('#search').value.trim().toLowerCase();
  const category = document.querySelector('#category').value;
  const sort = document.querySelector('#sort').value;

  let result = products.filter(function (product) {
    return product.title.toLowerCase().includes(search);
  });

  if (category !== '') {
    result = result.filter(function (product) {
      return product.category === category;
    });
  }

  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

  showProducts(result, productList, 'product.html');
  statusText.textContent = result.length + ' produkter';
  if (result.length === 0) statusText.textContent = 'Inga produkter matchar din sökning.';
}

async function loadProducts() {
  statusText.textContent = 'Laddar produkter…';
  productList.setAttribute('aria-busy', 'true');
  retryButton.hidden = true;
  if (form) document.querySelector('#filters').disabled = true;

  try {
    products = await getTechProducts();
    updateProducts();
    if (form) document.querySelector('#filters').disabled = false;
  } catch {
    statusText.textContent = 'Kunde inte ladda produkterna. Kontrollera anslutningen och försök igen.';
    retryButton.hidden = false;
  } finally {
    productList.setAttribute('aria-busy', 'false');
  }
}

if (form) {
  const selectedCategory = new URLSearchParams(location.search).get('category');
  if (categories[selectedCategory]) document.querySelector('#category').value = selectedCategory;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
  form.addEventListener('input', updateProducts);
  document.querySelector('#clear').addEventListener('click', function () {
    form.reset();
    updateProducts();
  });
}

retryButton.addEventListener('click', loadProducts);
loadProducts();
