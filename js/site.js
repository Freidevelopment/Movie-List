const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjhmMmEzOTFjMDkwZWFmYTcxNDI1OWU0MDQzOGUyYyIsInN1YiI6IjY2MTk4MDY2MTA5Y2QwMDE3ZWEzYzcwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBLVs1eHyvSMYqeJ-LlqaSqp-iKE_vzd_IAyblIlI9E';


// called from the webpage (controller function)
async function displayPopularMovies() {
  let movies = await getPopularMovies();
  displayMovies(movies);
}

// Returns a list of an array of movie objects or an empty array
async function getPopularMovies() {
    
    try {
      // Step One get the url
      const getPopularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular';
      // step Two call the API. 'the variable response holds the json data response'
      let response = await fetch(getPopularMoviesUrl, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if(response.ok) {
        let data = await response.json();
        return data.results;
      } else {
        return [];
      }

    } catch(error) {
      console.log(error);
      return [];
    }

}

// Formats the movie abject into html
function displayMovies(movies) {
    // get movie card template
    const movieCardTemplate = document.getElementById('movie-card-template');

    // Find the element where the movie card will go
    const movieRow = document.getElementById('movie-row');
    // Reset the display
    movieRow.innerHTML = '';

    // we need a card for each movie in the movies array
    for (const movie of movies) {

        // get a copy of the template
        let movieCard = movieCardTemplate.content.cloneNode(true);

        // Modify the template with the current movie
        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        let descriptionElement = movieCard.querySelector('.card-text');
        descriptionElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`); 

        let infoButton = movieCard.querySelector('.btn-primary');
        infoButton.setAttribute('data-movieId', movie.id);
        
        let favoriteButton = movieCard.querySelector('.btn-outline-primary');
        favoriteButton.setAttribute('data-movieId', movie.id);

        // add it to the page
        movieRow.appendChild(movieCard);

    };
}

// Step ONE when the user click hte more info button show a modal
// Step TWO call the API. Make sure teh content is in teh netword tab
// Step Three - Modify the modal for each movie

// When the user clicks the more info button show a modal
// https://api.themoviedb.org/3/movie/663134
async function showMovieDetails(button) {
    let movieId = button.getAttribute('data-movieId');
    let movie = await getMovieDetail(movieId);

    // get the modal and modify it
    
}

// call the TMDAPI to get teh movie detail
// https://api.themoviedb.org/3/movie/663134
async function getMovieDetail(movieId) {
    
  const movieDetailUrl =  `https://api.themoviedb.org/3/movie/${movieId}`;
  
  alert(`the movie id is ${movieId}`);

// Return a Movie object
}