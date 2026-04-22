const API_KEY = "1596b9274b07efadc205e7d05af3166a"; // ⚠️ keep private later
const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesContainer = document.getElementById("movies");
const status = document.getElementById("status");

// 🎯 Rating color
function getColor(vote) {
  if (vote >= 7) return "lime";
  if (vote >= 5) return "orange";
  return "red";
}

// 🔍 Form submit (better than keypress)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = search.value.trim();
  if (query) getMovies(query);
});

// 🎬 Fetch Movies
async function getMovies(query) {
  status.innerText = "Loading...";
  moviesContainer.innerHTML = "";

  try {
    const res = await fetch(
      `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      status.innerText = "No results found ❌";
      return;
    }

    showMovies(data.results);
    status.innerText = "";
  } catch (error) {
    status.innerText = "Error loading movies ❌";
    console.error("Fetch error:", error);
  }
}

// 🎥 Display Movies
function showMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    if (!movie.poster_path) return;

    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span style="color:${getColor(movie.vote_average)}">
          ⭐ ${movie.vote_average.toFixed(1)}
        </span>
      </div>

      <div class="overview">
        <p>${movie.overview || "No description available"}</p>
      </div>
    `;

    moviesContainer.appendChild(div);
  });
}