const order = JSON.parse(localStorage.getItem("lastOrder"));

if (!order) {
    window.location.href = "index.html";
}

document.getElementById("orderId").textContent = order.orderId;

document.getElementById("customerName").textContent =
order.customer.name;

document.getElementById("orderDate").textContent =
order.date;

document.getElementById("orderTotal").textContent =
order.total;

document
.getElementById("continueShopping")
.addEventListener("click", () => {

    localStorage.removeItem("lastOrder");

    window.location.href = "index.html";

});