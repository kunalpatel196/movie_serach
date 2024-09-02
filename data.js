var btn = document.querySelector('#btn');
var searchInput = document.getElementById('search');
var searchForm = document.getElementById('searchForm');
var result = document.querySelector('#result'); // Use querySelector for a single element

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  var searchQuery = searchInput.value;
  await loadMovie(searchQuery);
});

async function loadMovie(query) {
  const url = `https://www.omdbapi.com/?s=${query}&page=1&apikey=37764be8`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json(); // Use 'data' to store the JSON response
    console.log(data);
    if (data.Response === "True") {
      displayMovies(data.Search); // Pass the list of movies to the `displayMovies` function
    } else {
      result.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
//there are take data from the api only images and titles
function displayMovies(movies) {
  result.innerHTML = ""; // Clear previous results
  movies.forEach(movie => {
    result.innerHTML += `
    <div class="movie">
      <div id='img'>
        <img src='${movie.Poster}' alt='${movie.Title}' style='width:100%;height:100%;'>
      </div>
      <div id='content'>
        <h1>${movie.Title}</h1>
        <table>
          <tr>
            <td>Rating ✨</td>
            <td>Country</td>
            <td>Year</td>
          </tr>
          <tr>
            <td>${movie.imdbRating}</td>
            <td>${movie.Country}</td>
            <td>${movie.Year}</td>
          </tr>
        </table>
        <button type='button' onclick='window.open("https://www.imdb.com/title/${movie.imdbID}", "_blank")'>Visit</button>
      </div>
      </div>
    `;
  });
}
