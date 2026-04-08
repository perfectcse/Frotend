const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const coverImg = document.getElementById("coverImg");
const player = document.querySelector(".player");

// 🎵 Songs
const songs = [
  { name: "Bairan", src: "song1.mp3", cover: "cover1.jpg" },
  { name: "Destiny", src: "song2.mp3", cover: "cover2.jpg" },
  { name: "Jaiye Sajana", src: "song3.mp3", cover: "cover3.jpg" }
];

let songIndex = 0;

// 🎧 Load Song
function loadSong(song) {
  title.innerText = song.name;
  audio.src = song.src;

  // Safe cover load (no infinite loop)
  coverImg.src = song.cover;
  coverImg.onerror = () => {
    coverImg.onerror = null; // stop loop
    coverImg.src = "cover1.jpg"; // local fallback
  };
}

// ▶ Play
function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
  player.classList.add("playing");
}

// ⏸ Pause
function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
  player.classList.remove("playing");
}

// Toggle Play
playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

// Next
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

// Previous
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
prevBtn.addEventListener("click", prevSong);

// Progress Update
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;

  if (!duration) return;

  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

// Format Time
function formatTime(time) {
  const min = Math.floor(time / 60) || 0;
  const sec = Math.floor(time % 60) || 0;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Seek
document.querySelector(".progress-container").addEventListener("click", (e) => {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Auto Next
audio.addEventListener("ended", nextSong);

// Initial Load
loadSong(songs[songIndex]);