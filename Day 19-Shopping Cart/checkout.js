// ===============================
// DOM Elements
// ===============================

const summaryItems = document.getElementById("summaryItems");
const totalItems = document.getElementById("totalItems");
const totalAmount = document.getElementById("totalAmount");

const placeOrder = document.getElementById("placeOrder");
const backBtn = document.getElementById("backBtn");

// Form Inputs
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const pincodeInput = document.getElementById("pincode");

// ===============================
// Load Cart
// ===============================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// Display Order Summary
// ===============================

function loadSummary() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "index.html";
        return;
    }

    summaryItems.innerHTML = "";

    let total = 0;
    let items = 0;

    cart.forEach(product => {

        total += product.price * product.quantity;
        items += product.quantity;

        summaryItems.innerHTML += `
            <div class="summary-item">
                <div>
                    <h4>${product.name}</h4>
                    <p>Qty: ${product.quantity}</p>
                </div>

                <strong>₹${product.price * product.quantity}</strong>
            </div>
        `;
    });

    totalItems.textContent = items;
    totalAmount.textContent = total;
}

loadSummary();

// ===============================
// Back Button
// ===============================

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

// ===============================
// Place Order
// ===============================

placeOrder.addEventListener("click", () => {

    // Validation

    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === "" ||
        addressInput.value.trim() === "" ||
        cityInput.value.trim() === "" ||
        stateInput.value.trim() === "" ||
        pincodeInput.value.trim() === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Generate Order ID

    const orderId =
        "ORD" + Math.floor(Math.random() * 1000000);

    // Save Order

    const order = {

        orderId,

        customer: {

            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            address: addressInput.value,
            city: cityInput.value,
            state: stateInput.value,
            pincode: pincodeInput.value

        },

        cart,

        total: totalAmount.textContent,

        date: new Date().toLocaleDateString()

    };

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );

    // Clear Cart

    localStorage.removeItem("cart");

    // Redirect

    window.location.href = "success.html";

});