const MOVIE_API_KEY = "df59d294eccccdaa6fdeb2ae44143b4f";
const MOVIE_API_URL = "https://api.themoviedb.org/3";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const searchField = document.getElementById("movie-search");
const contentContainer = document.querySelector("main");

if (searchField) {
  searchField.addEventListener("keypress", handleSearch);
}

function handleSearch(event) {
  if (event.key === "Enter") {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      alert("Please enter a movie or TV show name to search.");
    }
  }
}

async function fetchMovies(query) {
  try {
    const response = await fetch(
      `${MOVIE_API_URL}/search/multi?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(query)}`
    );
    const { results } = await response.json();
    renderMovies(results);
  } catch (error) {
    alert("Unable to retrieve movie or TV show data. Please try again later.");
  }
}

function renderMovies(movies) {
  const movieResults = document.createElement("div");
  movieResults.classList.add("movie-results");

  movies.forEach((item) => {
    const isTV = item.media_type === "tv";
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.addEventListener("click", () => {
      try {
        sessionStorage.setItem(
          "selectedContent",
          JSON.stringify({ id: item.id, isTV })
        );
      } catch (e) {}
      window.location.href = `player.html?movieid=${item.id}&tv=${isTV}`;
    });

    const poster = document.createElement("img");
    poster.src = item.poster_path
      ? `${POSTER_BASE_URL}${item.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    poster.alt = item.title || item.name;
    poster.onerror = function () {
      this.src = '/imagenotfound.png';
    };

    const title = document.createElement("h3");
    title.textContent = item.title || item.name;

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieResults.appendChild(movieCard);
  });

  contentContainer.innerHTML = `
    <input id=\"movie-search\" placeholder=\"Find your favorite movie or show...\">
  `;
  contentContainer.appendChild(movieResults);

  const newSearchField = document.getElementById("movie-search");
  if (newSearchField) {
    newSearchField.addEventListener("keypress", handleSearch);
  }
}
