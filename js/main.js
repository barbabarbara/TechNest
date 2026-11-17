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

const categories = {
  laptops: 'Bärbara datorer',
  smartphones: 'Mobiltelefoner',
  tablets: 'Surfplattor',
  'mobile-accessories': 'Tillbehör'
};

async function getTechProducts() {
  let result = [];

  for (const category of Object.keys(categories)) {
    const response = await fetch('https://dummyjson.com/products/category/' + category + '?limit=0');
    if (!response.ok) {
      throw new Error('Kunde inte hämta produkter.');
    }
    const data = await response.json();
    result = result.concat(data.products);
  }

  return result;
}

function showProducts(products, container, detailPage) {
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
          <span>Visa produkt →</span>
        </div>
      </a>`;

    card.querySelector('a').href = detailPage + '?id=' + product.id;
    card.querySelector('h3').textContent = product.title;
    card.querySelector('.product-category').textContent = categories[product.category];
    card.querySelector('strong').textContent = product.price.toFixed(2) + ' USD';

    const image = card.querySelector('img');
    image.src = product.thumbnail;
    image.addEventListener('error', function () {
      image.hidden = true;
    });

    container.append(card);
  }
}
