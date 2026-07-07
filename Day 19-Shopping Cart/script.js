const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    image: "images/headphones.jpg"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 1999,
    category: "Electronics",
    image: "images/keyboard.jpg"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 999,
    category: "Accessories",
    image: "images/mouse.jpg"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 1500,
    category: "Electronics",
    image: "images/smartwatch.jpg"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1500,
    category: "Accessories",
    image: "images/speaker.jpg"
  },
  {
    id: 6,
    name: "Laptop Stand",
    price: 1299,
    category: "Accessories",
    image: "images/laptop.jpg"
  }
];

// DOM Elements
const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const checkoutBtn = document.getElementById("checkoutBtn");

// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts(productList) {
  productsContainer.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">₹${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// Add To Cart
function addToCart(id) {
  const item = cart.find(product => product.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
}

// Update Cart
function updateCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Render Cart
function renderCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p class='empty'>Your cart is empty.</p>";

    totalPrice.textContent = 0;
    cartCount.textContent = 0;

    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <h4>${item.name}</h4>

      <p>₹${item.price}</p>

      <div class="quantity">

        <button onclick="decreaseQty(${item.id})">-</button>

        <span>${item.quantity}</span>

        <button onclick="increaseQty(${item.id})">+</button>

      </div>

      <button class="remove"
      onclick="removeItem(${item.id})">
      Remove
      </button>
    `;

    cartItems.appendChild(div);

  });

  totalPrice.textContent = total;
  cartCount.textContent = count;

}

// Increase
function increaseQty(id) {

  const item = cart.find(p => p.id === id);

  item.quantity++;

  updateCart();

}

// Decrease
function decreaseQty(id) {

  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) {

    item.quantity--;

  } else {

    cart = cart.filter(p => p.id !== id);

  }

  updateCart();

}

// Remove
function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

  updateCart();

}

// Search
searchInput.addEventListener("input", filterProducts);

// Category
categorySelect.addEventListener("change", filterProducts);

function filterProducts() {

  const searchValue = searchInput.value.toLowerCase();

  const category = categorySelect.value;

  let filtered = products.filter(product => {

    const matchSearch =
      product.name.toLowerCase().includes(searchValue);

    const matchCategory =
      category === "all" ||
      product.category === category;

    return matchSearch && matchCategory;

  });

  displayProducts(filtered);

}

// Checkout
checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";

});

// Initial Load
displayProducts(products);
renderCart();