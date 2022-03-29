// *********  data from api   *******
const urlApi =
	'https://api.themoviedb.org/3/discover/movie?api_key=930ef87935b15c37f17e429d16d4dc9c&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

const normalApi =
	'https://api.themoviedb.org/3/discover/movie?api_key=930ef87935b15c37f17e429d16d4dc9c&sort_by=popularity.desc&include_adult=false&include_video=false&page=';

const imgApi = 'https://image.tmdb.org/t/p/original';

const searchUrl =
	'https://api.themoviedb.org/3/search/movie?api_key=930ef87935b15c37f17e429d16d4dc9c&query=';

// ********** fatching the data *********
getMovies(urlApi);

function getMovies(url) {
	fetch(url)
		.then((Response) => Response.json())
		.then((data) => renderDisplay(data.results))
		.catch((error) => console.log(error, 'error in message'));
}

// **** sellecting the main/from/search tag **********
const main = document.querySelector('.main');
const form = document.querySelector('form');
const inputValue = document.querySelector('#search');

// *** crating function to look over a movie ***
function renderDisplay(movies) {
	main.innerHTML = '';

	movies.forEach((movie) => {
		// console.log(movie);

		const movieTitle = movie.title;
		const overView = movie.overview;
		const movieRating = movie.vote_average;
		const moviePoster = movie.poster_path;
		// console.log();

		const movieDiv = document.createElement('div');
		movieDiv.classList.add('movie');
		movieDiv.innerHTML = `
		
		<img src="${moviePoster ? imgApi + moviePoster : './person-placeholder.png'}">
			<div class="movie_title">
				<h3>${movieTitle}</h3>
				<span class="${myRatingPointClass(movieRating)}">${movieRating}</span>
			</div>
			<div class="overview">
				<h3>Overview</h3>
				<p>${overView}
				</p>
		`;
		main.appendChild(movieDiv);
		// console.log(movieDiv);
	});
}

// *** function about rating  span  ***

function myRatingPointClass(rating) {
	if (rating >= 8) {
		return 'green';
	} else if (rating >= 6) {
		return 'orange';
	} else {
		return 'red';
	}
}

// ***  function about search ***
form.addEventListener('submit', function (reload) {
	reload.preventDefault();
	const inputData = inputValue.value.trim();
	if (inputData && inputData != '') {
		getMovies(searchUrl + inputData);
	} else if (inputData !== inputData.value) {
		return 'oh no movie not found';
	} else {
		window.location.reload();
	}
});

// *** button prev and next ***

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

var pNumber = 1;
nextButton.addEventListener('click', function (reload) {
	reload.preventDefault();
	pNumber += 1;
	getMovies(normalApi + pNumber);
});
prevButton.addEventListener('click', function (reload) {
	reload.preventDefault();
	pNumber -= 1;
	if (pNumber <= 1) {
		getMovies(urlApi);
		pNumber = 1;
	} else {
		getMovies(normalApi + pNumber);
	}
});
