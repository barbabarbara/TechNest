// This enables stricter JavaScript checks, helping catch certain programming mistakes.
"use strict";

/**
 * @file api.js
 * @description Central API module for the TechNest e-commerce website.
 *
 * This module handles communication with the DummyJSON Products API.
 * It provides reusable functions for CRUD operations:
 *
 * CREATE - Add new products using POST.
 * READ   - Fetch products using GET.
 * UPDATE - Modify existing products using PUT.
 * DELETE - Remove products using DELETE.
 *
 * Responsibilities:
 * - Fetch electronics from the four supported categories.
 * - Fetch individual products by their ID.
 * - Send product creation, update, and deletion requests.
 * - Validate HTTP responses and handle API errors.
 * - Export reusable functions for other JavaScript modules.
 *
 * IMPORTANT:
 * DummyJSON is a test API. POST, PUT, and DELETE operations
 * are simulated and do not permanently change server data.
 *
 * Technologies: Vanilla JavaScript, Fetch API, async/await,
 * Promises, and ES modules.
 *
 * @see https://dummyjson.com/docs/products
 */

// --- API Configuration ---

// Base URL for the DummyJSON Products API.
const API_URL = "https://dummyjson.com/products";

// Electronics categories available in TechNest.
// We select these four because TechNest sells electronics, not cosmetics, clothing or furniture.
const CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
];

// --- HTTP Request Helper ---

/**
 * Sends an HTTP request and returns the parsed JSON response.
 *
 * This helper avoids repeating fetch() and error-handling
 * logic in every CRUD function.
 *
 * GET is the default HTTP method when no options are provided.
 *
 * @param {string} url - API endpoint to request.
 * @param {RequestInit} [options={}] - Optional fetch configuration.
 * @returns {Promise<any>} Parsed JSON response.
 * @throws {Error} If the request fails or returns an HTTP error.
 */
async function requestJSON(url, options = {}) {
  try {
    // Send the HTTP request.
    const response = await fetch(url, options);

    // fetch() does not automatically throw for HTTP errors.
    // Check whether the server returned a successful status.
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    // Convert the JSON response into JavaScript data.
    return await response.json();
  } catch (error) {
    // Log the error for debugging.
    console.error("TechNest API error:", error);

    // Re-throw the error so the UI can display a message.
    throw error;
  }
}

// --- Read: All Products ---

/**
 * Fetches products from all four TechNest electronics categories.
 *
 * Promise.all() runs the requests concurrently and waits
 * for every request to finish successfully.
 *
 * The grouped return format is compatible with existing
 * TechNest modules that use data.smartphones, data.laptops,
 * data.tablets, and data.accessories.
 *
 * @returns {Promise<Object>} Products grouped by category.
 * @throws {Error} If any category request fails.
 */
export async function fetchAllProducts() {
  // Create a request for each electronics category.
  const requests = CATEGORIES.map((category) => {
    return requestJSON(
      `${API_URL}/category/${category}?limit=0`
    );
  });

  // Wait until all four requests have completed.
  const results = await Promise.all(requests);

  // Return the products grouped by category.
  return {
    smartphones: results[0].products,
    laptops: results[1].products,
    tablets: results[2].products,
    accessories: results[3].products,
  };
}

// --- Read: Single Product ---

/**
 * Fetches one product using its unique ID.
 *
 * Used by product detail pages and the admin interface.
 *
 * @param {number} id - Unique product ID.
 * @returns {Promise<Object>} Product information.
 * @throws {Error} If the product cannot be retrieved.
 */
export async function fetchProductById(id) {
  return requestJSON(`${API_URL}/${id}`);
}

// --- Create Product ---

/**
 * Creates a new product using an HTTP POST request.
 *
 * The product object is converted to JSON and sent
 * in the request body.
 *
 * DummyJSON returns a simulated created product
 * with a generated ID.
 *
 * @param {Object} product - New product information.
 * @returns {Promise<Object>} Simulated created product.
 * @throws {Error} If the creation request fails.
 */
export async function createProduct(product) {
  return requestJSON(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

// --- Update Product ---

/**
 * Updates an existing product using an HTTP PUT request.
 *
 * The fields provided in the changes object are sent
 * to the API.
 *
 * DummyJSON returns the simulated updated product.
 *
 * @param {number} id - ID of the product to update.
 * @param {Object} changes - Product fields to modify.
 * @returns {Promise<Object>} Simulated updated product.
 * @throws {Error} If the update request fails.
 */
export async function updateProduct(id, changes) {
  return requestJSON(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });
}

// --- Delete Product ---

/**
 * Deletes a product using an HTTP DELETE request.
 *
 * DummyJSON simulates deletion and returns a result
 * containing information such as:
 *
 * - isDeleted: true
 * - deletedOn: deletion timestamp
 *
 * The product is not permanently deleted from the API.
 *
 * @param {number} id - ID of the product to delete.
 * @returns {Promise<Object>} Simulated deletion result.
 * @throws {Error} If the deletion request fails.
 */
export async function deleteProduct(id) {
  return requestJSON(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
