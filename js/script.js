const inputSearch = document.getElementById("searchbox")
const searchbutton = document.getElementById("searchbtn")
const container = document.getElementById("movieContainer")

searchbutton.addEventListener("click", ()=>{
    console.log("button clikced")
})

// const div = document.createElement("div")
// div.innerText = "movie"
// container.appendChild(div)


async function fetchMovies() {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=8a9f9c4c746a5989665a8bd49bc58f65"

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    renderMovies(data)
}



function renderMovies(movies){
    const cardElm = document.querySelector("#movieContainer")
    let data = movies.results

        
    // let poster = movies.poster_path
    // let title = movies.title
    // let rating = movies.vote_average
    // let rating_count = movies.vote_count
    // let year = movies.release_date.split("-")[2]

    cardElm.innerHTML = data.map((movie, index) => 
        `
        <div class="card">
        
            <div class="img-container">
                <img class="image" src="https://image.tmdb.org/t/p/original${movie.poster_path}">
            </div>

            <div class="context-container">
                <p>⭐️ ${movie.vote_average} (${movie.vote_count})</p>
                <h3 class="title">${index + 1}. ${movie.title}</h3>
                <p>${movie.release_date.split("-")[2]}</p>
                <button class="wishlist-button">+ wishlist</button>
            </div>

        </div>
        `
    )

}

fetchMovies()