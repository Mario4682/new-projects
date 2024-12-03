const products = [
  { id: 1, name: "Apples", price: 2.5, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bananas", price: 1.8, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Carrots", price: 1.2, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Tomatoes", price: 2.0, image: "https://via.placeholder.com/150" },
];

const cart = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const loadedCart = JSON.parse(savedCart);
    cart.push(...loadedCart);
  }
}

function loadProducts() {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
  saveCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const cartList = document.createElement("ul");

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(cartItem);
  });

  cartItems.appendChild(cartList);
}

function showOrderForm() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before proceeding to checkout.");
    return;
  }

  const orderForm = document.getElementById("order-form");
  const orderSummary = document.getElementById("order-summary");

  orderForm.style.display = "block";
  orderSummary.innerHTML = cart
    .map((item) => `<p>${item.name} - $${item.price.toFixed(2)}</p>`)
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  orderSummary.innerHTML += `<strong>Total: $${total.toFixed(2)}</strong>`;
}

document.getElementById("checkout").addEventListener("click", showOrderForm);

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !email || !address) {
    alert("Please fill in all fields.");
    return;
  }

  alert(`Thank you, ${name}! Your order has been placed.\nOrder details will be sent to ${email}.`);
  document.getElementById("checkout-form").reset();
  cart.length = 0;
  updateCart();
  localStorage.removeItem("cart");
  document.getElementById("order-form").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  loadProducts();
  updateCart();
});
