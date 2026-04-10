const inputSearch = document.getElementById("searchbox")
const searchbutton = document.getElementById("searchbtn")
const container = document.getElementById("movieContainer")

let allMovies = [];
let isSorted = false;

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function applyFiltersAndSort() {
  const sortValue = document.getElementById("sortDropdown")?.value;
  const filterValue = document.getElementById("filterDropdown")?.value;

  let processedMovies = [...allMovies];

  // Apply Rating Filter
  if (filterValue && filterValue !== "all") {
    const minRating = parseFloat(filterValue);
    processedMovies = processedMovies.filter(movie => movie.vote_average >= minRating);
  }

  // Apply Sorting
  if (sortValue === "rating") {
    processedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortValue === "rating-asc") {
    processedMovies.sort((a, b) => a.vote_average - b.vote_average);
  } else if (sortValue === "alphabetical") {
    processedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "alphabetical-desc") {
    processedMovies.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderMovies(processedMovies);
}

async function performSearch(query) {
  if (!query) {
    fetchMovies(); 
    return;
  }
  
  const url = `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      allMovies = data.results;
      applyFiltersAndSort();
    }
  } catch (error) {
    console.error("Search failed:", error);
  }
}


inputSearch.addEventListener("input", debounce((e) => {
  performSearch(e.target.value.trim());
}, 500));


searchbutton.addEventListener("click", () => {
  performSearch(inputSearch.value.trim());
});

const sortDropdown = document.getElementById("sortDropdown");
sortDropdown.addEventListener("change", applyFiltersAndSort);

const filterDropdown = document.getElementById("filterDropdown");
if (filterDropdown) {
  filterDropdown.addEventListener("change", applyFiltersAndSort);
}

// const div = document.createElement("div")
// div.innerText = "movie"
// container.appendChild(div)


async function fetchMovies() {
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb";

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results) {
      allMovies = data.results;   
      applyFiltersAndSort();    
    } else {
      console.error("API returned no results:", data);
      document.querySelector("#movieContainer").innerHTML = "<p>Failed to load movies.</p>";
    }
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    document.querySelector("#movieContainer").innerHTML = "<p>Error loading movies.</p>";
  }
}


function renderMovies(movies) {
  const cardElm = document.querySelector("#movieContainer")
  let data = movies


  // let poster = movies.poster_path
  // let title = movies.title
  // let rating = movies.vote_average
  // let rating_count = movies.vote_count
  // let year = movies.release_date.split("-")[2]

  cardElm.innerHTML = data.map((movie, index) => {
    const img = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

    return `
    <div class="card">
      
      <div class="image-container">
        <img class="image" src="${img}" />
      </div>

      <div class="content-container">
        
        <div class="rating">
          ⭐ ${movie.vote_average.toFixed(1)} 
          <span>(${movie.vote_count})</span>
        </div>

        <h3 class="title">${index + 1}. ${movie.title}</h3>

        <p class="para">
          ${movie.release_date?.split("-")[0]} • 2h 30m
        </p>

        <button class="wishlist-button">+ wishlist</button>

      </div>

    </div>
  `;
  }).join("");

}


const themeToggleBtn = document.getElementById("themeToggleBtn");
if (themeToggleBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.innerText = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggleBtn.innerText = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggleBtn.innerText = "🌙";
    }
  });
}

fetchMovies()