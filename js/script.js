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

    cardElm.innerHTML = data.map((movie, index) => 
        `
        <div class="card">
            <h3 class="title">${movie.title}</h3>
            <img class="image" src="https://image.tmdb.org/t/p/original${movie.poster_path}">
        </div>
        `
    )

}

fetchMovies()