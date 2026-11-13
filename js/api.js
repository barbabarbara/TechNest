const API = "https://dummyjson.com/products"; 
let products = [];
 
// GET METHOD: Fetch all the products urls with async/await, try/catch and response.ok for error handling
export async function fetchAllProducts() {
  const urls = [
    `${API}/category/smartphones`,
    `${API}/category/laptops`,
    `${API}/category/tablets`,
    `${API}/category/mobile-accessories`,
  ];
 
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
 
    responses.forEach((res) => {
      if (!res.ok) {
        throw new Error(`Error with fetching: ${res.url} (${res.status})`);
      }
    });
 
    const [smartphones, laptops, tablets, accessories] = await Promise.all(
      responses.map((res) => res.json())
    );
 
    return {
      smartphones: smartphones.products,
      laptops: laptops.products,
      tablets: tablets.products,
      accessories: accessories.products,
    };

  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
}

// Iniciates the fetching of the four categories and pack them in a single list of products (catch error)
fetchAllProducts()
  .then((data) => {
    products = [
      ...data.smartphones,
      ...data.laptops,
      ...data.tablets,
      ...data.accessories,
    ];
    console.log(products);
    // console.log(...data.smartphones),
    // console.log(...data.laptops),
    // console.log(...data.tablets),
    // console.log(...data.accessories);
  })
  .catch((error) => console.error("Fetch failed:", error));

 
// Export function GET METHOD with async/await and ok.response (Parameter:id)
export async function getProduct(id) {
  const response = await fetch(`${API}/${id}`);
  if (!response.ok) throw new Error(`Could not fetch product ${id} (${response.status})`);
  return response.json();
}
 
// Export function POST METHOD with async/await and ok.response (parameter:product)
export async function createProduct(product) {
  const response = await fetch(`${API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),

  });

  if (!response.ok) 

    throw new Error(`Could not create product (${response.status})`);

  return response.json();
}
 
// Export function PUT METHOD with async/await and ok.response (parameter: id, changes)
export async function updateProduct(id, changes) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });

  if (!response.ok) 
    throw new Error(`Could not update product ${id} (${response.status})`);

  return response.json();
}
 
// Export function DELETE METHOD with async/await and ok.response (parameter: id)
export async function deleteProduct(id) {
  const response = await fetch(`${API}/${id}`, { method: "DELETE" });

  if (!response.ok) 
    throw new Error(`Could not delete product ${id} (${response.status})`);

  return response.json();
}