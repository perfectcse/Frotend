const btn = document.getElementById("followBtn");

btn.addEventListener("click", () => {
  if (btn.innerText === "Follow") {
    btn.innerText = "Following ✔";
    btn.style.background = "#28a745";
  } else {
    btn.innerText = "Follow";
    btn.style.background = "#ff7eb3";
  }
});