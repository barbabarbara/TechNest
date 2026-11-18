
"use strict";

/**
 * @file ui.js
 * @description Shared user interface functionality for TechNest.
 *
 * This module provides reusable functionality across all pages:
 *
 * - Website header and navigation.
 * - Compact premium footer.
 * - Responsive mobile navigation.
 * - Shopping cart and favorite counters.
 * - Product cards generated from API data.
 * - Safe HTML rendering.
 * - Currency formatting.
 * - Product image handling.
 * - Loading, success, and error messages.
 * - Temporary notifications using setTimeout().
 * - Add-to-cart and favorite button interactions.
 *
 * The module works with storage.js and is shared across
 * the TechNest website.
 */

// --- Imports ---

import {
  getCart,
  getFavorites,
  toggleFavorite,
  addToCart,
} from "./storage.js";

// --- Configuration ---

// Relative path to the project root.
// Homepage: "./"
// Pages inside pages/: "../"
export const root = document.body.dataset.root || "./";

// --- DOM Helpers ---

/**
 * Selects the first HTML element matching a CSS selector.
 *
 * @param {string} selector - CSS selector.
 * @returns {Element|null} Matching element or null.
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * Converts a number into a formatted USD price.
 *
 * @param {number|string} value - Product price.
 * @returns {string} Formatted currency.
 */
export function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);
}

/**
 * Escapes characters that could otherwise be interpreted
 * as HTML markup.
 *
 * @param {unknown} value - Value to escape.
 * @returns {string} Safe HTML text.
 */
export function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return String(value ?? "").replace(
    /[&<>"']/g,
    (character) => characters[character],
  );
}

// --- Product URLs and Images ---

/**
 * Builds a URL to an individual product page.
 *
 * @param {number|string} id - Product ID.
 * @returns {string} Product details URL.
 */
export function productUrl(id) {
  return (
    `${root}pages/product.html?id=` +
    encodeURIComponent(id)
  );
}

/**
 * Returns a valid product image URL.
 *
 * Uses the thumbnail first, then the first image.
 * Falls back to the TechNest icon if necessary.
 *
 * @param {Object} product - Product information.
 * @returns {string} Product image URL.
 */
export function imageUrl(product) {
  const value =
    product.thumbnail ||
    product.images?.[0] ||
    "";

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = new URL(value, location.href);

      if (["http:", "https:"].includes(parsed.protocol)) {
        return parsed.href;
      }
    } catch {
      // Invalid image URL: use the fallback below.
    }
  }

  return `${root}assets/images/technest-icon.png`;
}

// --- Notifications ---

let toastTimeout;

/**
 * Displays a temporary notification.
 *
 * setTimeout() hides the notification after 3.5 seconds.
 *
 * @param {string} message - Notification message.
 */
export function toast(message) {
  const element = $("#toast");

  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.add("show");

  // Prevent an earlier timeout from hiding a newer message.
  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    element.classList.remove("show");
  }, 3500);
}

/**
 * Displays a status message for loading, success, or errors.
 *
 * @param {string} selector - Target element selector.
 * @param {string} message - Message to display.
 * @param {string} type - Optional status type.
 */
export function showStatus(
  selector,
  message = "",
  type = "",
) {
  const element = $(selector);

  if (!element) {
    return;
  }

  element.textContent = message;

  element.className = type
    ? `status ${type}`
    : "status";

  element.hidden = !message;
}

// --- Navigation Counters ---

/**
 * Updates cart and favorite counters in the navigation.
 */
export function updateBadges() {
  const cartQuantity = getCart().reduce(
    (total, entry) => total + entry.quantity,
    0,
  );

  const favoriteQuantity = getFavorites().length;

  document
    .querySelectorAll("[data-cart-count]")
    .forEach((element) => {
      element.textContent = cartQuantity;
    });

  document
    .querySelectorAll("[data-favorite-count]")
    .forEach((element) => {
      element.textContent = favoriteQuantity;
    });
}

// --- Shared Header and Footer ---

/**
 * Creates the shared website header and footer.
 *
 * The same navigation and footer appear on every page.
 * Relative links are generated using the root variable.
 */
export function initLayout() {
  const headerContainer = $("#site-header");
  const footerContainer = $("#site-footer");

  const currentPage = document.body.dataset.page;

  // --- Navigation Links ---

  const paths = [
    ["Home", "index.html", "home"],
    ["Products", "pages/products.html", "products"],
    ["Favorites", "pages/favorites.html", "favorites"],
    ["Cart", "pages/cart.html", "cart"],
    ["Admin", "pages/admin.html", "admin"],
  ];

  // --- Render Header ---

  if (headerContainer) {
    const navigationLinks = paths
      .map(([name, path, page]) => {
        const isCurrentPage =
          page === currentPage ||
          (page === "products" && currentPage === "product");

        const currentAttribute = isCurrentPage
          ? 'aria-current="page"'
          : "";

        let counter = "";

        if (page === "favorites") {
          counter = `
            <span
              class="nav-count"
              data-favorite-count
              aria-label="saved products"
            >0</span>
          `;
        }

        if (page === "cart") {
          counter = `
            <span
              class="nav-count"
              data-cart-count
              aria-label="items in cart"
            >0</span>
          `;
        }

        return `
          <a href="${root}${path}" ${currentAttribute}>
            ${name}${counter}
          </a>
        `;
      })
      .join("");

    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="shell header-inner">

          <!-- TechNest Brand -->
          <a
            href="${root}index.html"
            class="brand"
            aria-label="TechNest homepage"
          >
            <img
              src="${root}assets/images/technest-icon.png"
              width="34"
              height="34"
              alt=""
            />

            <span>
              TechNest<span class="brand-dot">.</span>
            </span>
          </a>

          <!-- Mobile Menu Button -->
          <button
            id="menu-toggle"
            class="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-navigation"
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          <!-- Main Navigation -->
          <nav
            id="primary-navigation"
            class="primary-nav"
            aria-label="Main navigation"
          >
            ${navigationLinks}
          </nav>

        </div>
      </header>
    `;
  }

  // --- Render Compact Premium Footer ---

  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">

        <div class="shell footer-inner">

          <!-- Brand and Description -->
          <div class="footer-brand-group">
            <a
              href="${root}index.html"
              class="footer-brand"
            >
              TechNest<span>.</span>
            </a>

            <p>
              Thoughtful technology for everyday life.
            </p>
          </div>

          <!-- Footer Navigation -->
          <nav
            class="footer-links"
            aria-label="Footer navigation"
          >
            <a href="${root}pages/products.html">
              Products
            </a>

            <a href="${root}pages/favorites.html">
              Favorites
            </a>

            <a href="${root}pages/admin.html">
              Product management
            </a>

            <a
              href="https://dummyjson.com/docs/products"
              target="_blank"
              rel="noopener noreferrer"
            >
              DummyJSON API ↗
            </a>
          </nav>

        </div>

        <!-- Copyright -->
        <div class="shell footer-bottom">
          © 2026 TechNest · Student project ·
          Simulated orders only
        </div>

      </footer>
    `;
  }

  // --- Mobile Navigation ---

  const menuToggle = $("#menu-toggle");
  const navigation = $("#primary-navigation");

  if (menuToggle && navigation) {
    /**
     * Opens or closes the mobile navigation.
     *
     * @param {boolean} open - Whether the menu should be open.
     */
    function setMenuOpen(open) {
      navigation.classList.toggle("open", open);

      menuToggle.setAttribute(
        "aria-expanded",
        String(open),
      );

      menuToggle.setAttribute(
        "aria-label",
        open
          ? "Close navigation menu"
          : "Open navigation menu",
      );
    }

    // Toggle menu when clicking the mobile menu button.
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.contains("open");
      setMenuOpen(!isOpen);
    });

    // Close the mobile menu when a navigation link is clicked.
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    // Allow keyboard users to close the menu with Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });
  }

  // --- Initialize Counters ---

  updateBadges();

  // Update counters when storage data changes.
  window.addEventListener(
    "technest:changed",
    updateBadges,
  );

  // --- Global Product Button Interactions ---

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const favoriteButton = event.target.closest("[data-fav]");
    const cartButton = event.target.closest("[data-add]");

    // --- Favorite Button ---

    if (favoriteButton) {
      event.preventDefault();

      const productId = favoriteButton.dataset.fav;

      try {
        const active = toggleFavorite(productId);

        // Update all favorite buttons for the same product.
        document
          .querySelectorAll("[data-fav]")
          .forEach((button) => {
            if (button.dataset.fav !== productId) {
              return;
            }

            button.classList.toggle("active", active);

            button.setAttribute(
              "aria-pressed",
              String(active),
            );

            button.setAttribute(
              "aria-label",
              active
                ? "Remove from favorites"
                : "Add to favorites",
            );

            button.textContent = active ? "♥" : "♡";
          });

        updateBadges();

        toast(
          active
            ? "Added to favorites"
            : "Removed from favorites",
        );
      } catch (error) {
        toast(error.message);
      }

      return;
    }

    // --- Add to Cart Button ---

    if (cartButton) {
      event.preventDefault();

      if (cartButton.disabled) {
        return;
      }

      try {
        const productId = cartButton.dataset.add;

        addToCart(productId);

        updateBadges();

        toast("Added to cart");
      } catch (error) {
        toast(error.message);
      }
    }
  });
}

// --- Product Card Component ---

/**
 * Generates the HTML for a product card.
 *
 * Used on the homepage, catalogue, and other product lists.
 *
 * @param {Object} product - Product data from DummyJSON.
 * @returns {string} Product card HTML.
 */
export function productCard(product) {
  const productId = product.id;

  const isFavorite = getFavorites().includes(
    Number(productId),
  );

  const soldOut = Number(product.stock) === 0;

  const categoryName = String(
    product.category || "Electronics",
  ).replaceAll("-", " ");

  const brandName = product.brand || categoryName;

  const favoriteSymbol = isFavorite ? "♥" : "♡";

  const favoriteLabel = isFavorite
    ? "Remove from favorites"
    : "Add to favorites";

  const buttonLabel = soldOut ? "Sold out" : "+ Add";

  return `
    <article class="product-card">

      <!-- Product Image -->
      <a
        class="product-photo"
        href="${productUrl(productId)}"
        aria-label="View ${escapeHTML(product.title)}"
      >
        <img
          loading="lazy"
          src="${escapeHTML(imageUrl(product))}"
          alt="${escapeHTML(product.title)}"
        />
      </a>

      <!-- Favorite Button -->
      <button
        class="favorite-button ${isFavorite ? "active" : ""}"
        type="button"
        data-fav="${escapeHTML(productId)}"
        aria-label="${favoriteLabel}: ${escapeHTML(product.title)}"
        aria-pressed="${isFavorite}"
      >
        ${favoriteSymbol}
      </button>

      <!-- Product Information -->
      <div class="product-meta">

        <span class="eyebrow">
          ${escapeHTML(brandName)}
        </span>

        <a href="${productUrl(productId)}">
          <h3>${escapeHTML(product.title)}</h3>
        </a>

        <!-- Price and Cart Button -->
        <div class="product-bottom">

          <strong>
            ${money(product.price)}
          </strong>

          <button
            class="add-button"
            type="button"
            data-add="${escapeHTML(productId)}"
            aria-label="Add ${escapeHTML(product.title)} to cart"
            ${soldOut ? "disabled" : ""}
          >
            ${buttonLabel}
          </button>

        </div>
      </div>

    </article>
  `;
}
