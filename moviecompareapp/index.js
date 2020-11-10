const fetchData = async (input) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '7a68c485',
			s: `${input}`
		}
	});
	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input type="text" class="input"/>
<div class="dropdown">
	<div class="dropdown-menu">
		<div class="dropdown-content results">
			
		</div>
	</div>
</div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultswrapper = document.querySelector('.results');

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
	//console.log(movies);
	resultswrapper.innerHTML = '';
	dropdown.classList.add('is-active');
	for (const movie of movies) {
		//console.log(movie.Title, movie.Year, movie.Poster);
		const option = document.createElement('a');
		option.classList.add('dropdown-item');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		option.innerHTML = `
		<img src="${imgSrc}"> 
		${movie.Title}
		`;

		resultswrapper.appendChild(option);

		option.addEventListener('click', (e) => {
			//alert('clicked');
			input.value = movie.Title;
			dropdown.classList.remove('is-active');
			onMovieSelect(movie);
		});
	}
};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async (movie) => {
	//console.log(movie.imdbID);
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '7a68c485',
			i: `${movie.imdbID}`
		}
	});
	console.log(response.data);
};
