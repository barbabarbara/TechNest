/** TechNest administration: simulated API CRUD with a persistent local preview. */
import { CATEGORIES, getProducts, createProduct, updateProduct, deleteProduct } from "./api.js";
import { getOverrides, saveOverrides, resetOverrides, removeDeletedProductReferences } from "./storage.js";
import { initLayout, $, escapeHTML, money, showStatus, toast } from "./ui.js";

initLayout();
const form = $("#product-form");
const list = $("#admin-products");
const submit = $("#save-product");
const cancel = $("#cancel-edit");
let products = [];
let busy = false;

function feedback(message, kind = "") { showStatus("#admin-feedback", message, kind); }
function toggleBusy(value, label = "Working...") {
  busy = value;
  [...form.elements].forEach(control => { control.disabled = value; });
  list.classList.toggle("busy", value);
  $("#reset-admin").disabled = value;
  submit.textContent = value ? label : ($("#edit-id").value ? "Save changes" : "Create product");
}
function resetForm() {
  form.reset();
  $("#edit-id").value = "";
  $("#form-title").textContent = "Create product";
  submit.textContent = "Create product";
  cancel.hidden = true;
}
function showProducts() {
  $("#admin-count").textContent = `${products.length} products`;
  list.replaceChildren();
  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "small-muted";
    empty.textContent = "No products in this preview. Reset local changes to restore the catalogue.";
    list.append(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  for (const product of products) {
    const row = document.createElement("article");
    row.className = "admin-row";
    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = product.title;
    const details = document.createElement("p");
    details.textContent = `${product.category} · ${money(product.price)} · Stock ${product.stock ?? "N/A"} · ID ${product.id}`;
    info.append(title, details);
    const controls = document.createElement("div");
    controls.className = "admin-buttons";
    for (const [action, cssClass] of [["Edit", "subtle"], ["Delete", "danger"]]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `button small ${cssClass}`;
      button.dataset[action.toLowerCase()] = String(product.id);
      button.textContent = action;
      button.setAttribute("aria-label", `${action} ${product.title}`);
      controls.append(button);
    }
    row.append(info, controls);
    fragment.append(row);
  }
  list.append(fragment);
}
async function refresh() {
  showStatus("#admin-status", "Loading electronics from DummyJSON...");
  try {
    products = await getProducts({ fresh: true });
    showProducts();
    showStatus("#admin-status", "");
    $("#admin-retry").hidden = true;
  } catch (error) {
    showStatus("#admin-status", `Could not load products: ${error.message}`, "error");
    $("#admin-retry").hidden = false;
  }
}

function getFormData() {
  return {
    title: $("#admin-title").value.trim(),
    category: $("#admin-category").value,
    price: Number($("#admin-price").value),
    stock: Number($("#admin-stock").value),
    description: $("#admin-description").value.trim(),
    thumbnail: $("#admin-image").value.trim(),
  };
}
function validate(data) {
  if (!form.reportValidity()) return false;
  if (!data.title || !CATEGORIES.includes(data.category) || !Number.isFinite(data.price) || data.price <= 0 || !Number.isInteger(data.stock) || data.stock < 0) {
    feedback("Enter a valid product name, category, price and stock quantity.", "error");
    return false;
  }
  return true;
}
function editProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product) return feedback("The selected product no longer exists.", "error");
  $("#edit-id").value = String(product.id);
  $("#admin-title").value = product.title;
  $("#admin-category").value = product.category;
  $("#admin-price").value = product.price;
  $("#admin-stock").value = product.stock ?? 0;
  $("#admin-description").value = product.description || "";
  $("#admin-image").value = product.thumbnail?.startsWith("http") ? product.thumbnail : "";
  $("#form-title").textContent = `Edit product`;
  submit.textContent = "Save changes";
  cancel.hidden = false;
  feedback(`Editing ${product.title}`);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  $("#admin-title").focus({ preventScroll: true });
}

async function saveProduct(event) {
  event.preventDefault();
  if (busy) return;
  const data = getFormData();
  if (!validate(data)) return;
  const id = $("#edit-id").value ? Number($("#edit-id").value) : null;
  const original = id === null ? null : products.find(product => product.id === id);
  if (id !== null && !original) return feedback("The selected product no longer exists.", "error");
  toggleBusy(true, id === null ? "Creating product..." : "Saving product...");
  feedback(id === null ? "Creating product through DummyJSON..." : "Updating product...");
  try {
    const overrides = getOverrides();
    if (id === null) {
      // DummyJSON POST confirms creation, but does not persist it.
      await createProduct(data);
      const localId = Math.max(1000000, ...overrides.created.map(product => product.id), ...overrides.deleted.filter(id => id >= 1000000)) + 1;
      overrides.created.unshift({ ...data, id: localId, brand: "TechNest", rating: 0 });
    } else if (original.id >= 1000000) {
      const index = overrides.created.findIndex(product => product.id === id);
      if (index < 0) throw new Error("Local product not found.");
      overrides.created[index] = { ...overrides.created[index], ...data };
    } else {
      await updateProduct(id, data);
      overrides.updated[id] = { ...(overrides.updated[id] || {}), ...data };
    }
    saveOverrides(overrides);
    products = await getProducts();
    showProducts();
    resetForm();
    feedback(id === null ? "Product created. Saved in this browser's demo catalogue." : "Product updated. Saved in this browser's demo catalogue.", "success");
    toast(id === null ? "Product created" : "Product updated");
  } catch (error) {
    feedback(`Unable to save product: ${error.message}`, "error");
  } finally {
    toggleBusy(false);
  }
}
async function removeProduct(id) {
  if (busy) return;
  const product = products.find(entry => entry.id === id);
  if (!product) return;
  if (!window.confirm(`Delete "${product.title}" from your demo catalogue?`)) return;
  toggleBusy(true, "Deleting product...");
  feedback(`Deleting ${product.title}...`);
  try {
    if (id < 1000000) await deleteProduct(id);
    const overrides = getOverrides();
    if (id < 1000000) {
      overrides.deleted = [...new Set([...overrides.deleted, id])];
    }
    overrides.created = overrides.created.filter(entry => entry.id !== id);
    delete overrides.updated[id];
    saveOverrides(overrides);
    removeDeletedProductReferences([id]);
    products = await getProducts();
    showProducts();
    if ($("#edit-id").value === String(id)) resetForm();
    feedback(`"${product.title}" removed from the demo catalogue.`, "success");
    toast("Product deleted");
  } catch (error) {
    feedback(`Unable to delete product: ${error.message}`, "error");
  } finally { toggleBusy(false); }
}

list.addEventListener("click", event => {
  const edit = event.target.closest("[data-edit]");
  const deletion = event.target.closest("[data-delete]");
  if (edit) editProduct(Number(edit.dataset.edit));
  if (deletion) void removeProduct(Number(deletion.dataset.delete));
});
form.addEventListener("submit", saveProduct);
cancel.addEventListener("click", () => { if (!busy) { resetForm(); feedback("Editing cancelled."); } });
$("#reset-admin").addEventListener("click", async () => {
  if (busy || !window.confirm("Reset all locally created, edited and deleted products?")) return;
  resetOverrides();
  resetForm();
  products = await getProducts();
  showProducts();
  feedback("Local product changes reset.", "success");
});
$("#admin-retry").addEventListener("click", refresh);
await refresh();
