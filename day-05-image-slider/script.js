const slide = document.getElementById("slide");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const images = [
  "https://picsum.photos/id/1015/600/350",
  "https://picsum.photos/id/1016/600/350",
  "https://picsum.photos/id/1018/600/350",
  "https://picsum.photos/id/1020/600/350"
];

let index = 0;

// Show Image
function showImage() {
  slide.src = images[index];
}

// Next
next.addEventListener("click", () => {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  showImage();
});

// Prev
prev.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
  showImage();
});

// Auto Slide
setInterval(() => {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  showImage();
}, 3000);