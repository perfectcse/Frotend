const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const icon = menuIcon.querySelector("i");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Icon toggle (bars ↔ close)
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});


// 🔥 Active link highlight
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});