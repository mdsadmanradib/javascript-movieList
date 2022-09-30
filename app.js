//Define UI Vars

const form = document.querySelector('#movie-form');
const movieList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-movies');
const filter = document.querySelector('#filter');
const movieInput = document.querySelector('#movie')

//Load all event listener

loadEventListeners();

function loadEventListeners(){
  //DOM Load even

  document.addEventListener('DOMContentLoaded', getMovies);
  //Add movie event
  form.addEventListener('submit', addMovie);

  //Remove movie 
  movieList.addEventListener('click', removeMovie);

  //Clear movies

  clearBtn.addEventListener('click', clearMovie); 

  //Filter movie
  filter.addEventListener('keyup', filterMovie);
}

//Get movies from LS
function getMovies(){
  let movies;
  if(localStorage.getItem('movies')===null){
    movies = [];
  }
  else{
    movies = JSON.parse(localStorage.getItem('movies'));
  }
  movies.forEach(function(movie){
    //Create li element

  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(movie));
  //Create new link element

  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul

  movieList.appendChild(li);
  })


}

function addMovie(e){
  if(movieInput === ''){
    alert('Add a movie')
  }
  //Create li element

  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(movieInput.value));
  //Create new link element

  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul

  movieList.appendChild(li);

  //Store in LS
  storeMovieInlStorage(movieInput.value);

  //Clear input
  movieInput.value = '';

  e.preventDefault();
}

//Store Movie

function storeMovieInlStorage(movie){
  let movies;
  if(localStorage.getItem('movies')===null){
    movies = [];
  }
  else{
    movies = JSON.parse(localStorage.getItem('movies'));
  }
  movies.push(movie);

  localStorage.setItem('movies', JSON.stringify(movies));
}

//Remove movie

function removeMovie(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){

      e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeMovieFromlStorage(e.target.parentElement.parentElement);
    }

  }

}

//Remove movies from LS

function removeMovieFromlStorage(movieItem){
  let movies;
  if(localStorage.getItem('movies')=== null){
    movies = [];
  }
  else{
    movies = JSON.parse(localStorage.getItem('movies'));
  }

  movies.forEach(function(movie, index){
    if(movieItem.textContent === movie){
      movies.splice(index, 1);
    }

  });
  localStorage.setItem('movies', JSON.stringify(movies));
}

//Clear Movie

function clearMovie(){
  while(movieList.firstChild){
    movieList.removeChild(movieList.firstChild);
  }

  //Clear from LS
  clearMovieFromlStorage();
}

//Clear from LS
function clearMovieFromlStorage(){
  localStorage.clear();
}

//Filter movie

function filterMovie(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(movie){
    const item = movie.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      movie.style.display = 'block';
    }
    else{
      movie.style.display = 'none';
    }

  });
   

}