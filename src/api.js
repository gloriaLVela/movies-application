/**Retrieve movies from /api/movies (db.json) set-up in server.js*/
import {getMovieInfoOmdbAPI} from './OMDB_API';
import {displaySpinner, clearAddMovie, removeSpinner, displayMessage} from './manageDOM';
import {displayMovie} from "./buildHTML";
import {addMovieArray, checkDuplicateMovie, removeMovieList} from './index.js';

/**
 *
 * Purpose: Handle the api calls to the movie db inside the db.json
 */

/**
 *
 * Change the movie title to title case
 */
function changeTitleCase(elementName) {
    let title = document.getElementById(elementName).value.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    return title;
}

/**
 *
 * Get the list of movies from the database
 */
const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
};

/**
 *
 * Get the movie from the database
 */
const getMovieDB = (title) => {
    return fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            /** filter the movies by the movie title **/
            return movies.filter(function (movie) {
                return (movie.title.trim() == title);
            });
        })
};


/**
 *
 * Get the movie poster from the database
 */
const getMovieInfoId = (id) => {
    return fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            /** filter the movies by the movie title **/
            return movies.filter(function (movie) {
                return (movie.id == id);
            });
        })
};


/**
 * Add a movie to the database
 * */
const addMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data

    displaySpinner();
    let rating = document.getElementById('rating').value;
    let title = changeTitleCase('movie-name');
    let newMovieName = title;
    // console.log((newMovieName));

    clearAddMovie();
    // console.log(' add id ' + id);
    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";

    getMovieInfoOmdbAPI(title).then((data) => {
        urlPoster = data["Poster"];
        movieRated = data["Rated"];
        currentGenre = data["Genre"];
        year = data["Year"];

        let genre = "";

        if (currentGenre != undefined) currentGenre.split(",");
        let title = data["Title"];
        // Check if the movie exists in the database
        if (typeof(title) === 'undefined') {
            removeSpinner();
            displayMessage(newMovieName, 4);
        } else {
            if (!checkDuplicateMovie(title, 0)) {
                // Create the new movie object
                const newMovie = {
                    title,
                    rating,
                    movieRated,
                    genre,
                    year,
                    urlPoster
                };
                addMovieArray(title);
                //Update the movie database
                const url = '/api/movies';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovie),
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then(newMovie => getMovieDB(newMovie.title)
                        .then(newMovie => displayMovie(newMovie))
                        .then(() => {
                                removeSpinner();

                                // Movie added to the system
                                displayMessage(title, 1);
                            }
                        )
                    )
                    .catch(() => {
                        // Problem with the movie
                        removeSpinner();
                        displayMessage(title, 3);
                    });

            }
            else {
                // The movie exists in the system
                displayMessage(title, 3);
                removeSpinner();
            }
        }
    });
};

/**
 *
 * Delete movie
 *
 **/
const deleteMovie = (id) => {

    // Clear the add movie
    clearAddMovie()

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    removeMovieList(id);
    // update database
    fetch(`/api/movies/${id}`, options)
        .then(() => {
            console.log(`movie ${id} deleted`);
        })
        .catch(() => {
            console.log('error on delete')
        });

};

/**
 * Update Movie
 ** Step 1 Move data from display to update form
 * */
const displayUpdateScreen = (id) => {
    // alert('Display update form');
    return fetch(`/api/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
            let {title, rating, id, urlPoster} = movie;
            //setup the update movie modal
            // movie-poster-update
            document.getElementById("old-name").innerText = "Current title :" + title;
            document.getElementById("new-name").value = title;
            document.getElementById("new-rating").value = rating;
            document.getElementById("updateMovieID").value = id;
            document.getElementById("movie-poster-update").src = urlPoster;

            //changes stars to black
            for (let i = 1; i <= 5; i++) {
                let cur = document.getElementById("update-star" + i)
                cur.className = "fa fa-star"
            }
            //change stars to orange
            for (let i = 1; i <= rating; i++) {
                let cur = document.getElementById("update-star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
            $('#update-form').modal('toggle');
        });
};

/**
 * Update Movie
 ** Step 2 update movie in database
 * */
const updateMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('new-rating').value;
    let title = changeTitleCase('new-name'); //document.getElementById('new-name').value.trim();
    let id = document.getElementById("updateMovieID").value;
    let newMovieName = title;
    clearAddMovie();

    // Hide  update form
    // $("#update-form").modal('toggle');

    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";

    //Get the movie information
    getMovieInfoOmdbAPI(title).then((data) => {
        title = data["Title"];
        if (typeof(title) === 'undefined') {
            removeSpinner();
            displayMessage(newMovieName, 4);
        }
        else {
            if (!checkDuplicateMovie(data["Title"], id)) {
                urlPoster = data["Poster"];
                movieRated = data["Rated"];
                currentGenre = data["Genre"];
                year = data["Year"];
                document.getElementById(`img${id}`).setAttribute("src", urlPoster);

                // Update the star rating
                let starHTML = "";

                for (let i = 0; i < rating; i++) {
                    starHTML += `<span class="fa fa-star checked"></span>`;
                }
                for (let i = rating; i < 5; i++) {
                    starHTML += `<span class="fa fa-star"></span>`;
                }

                document.getElementById(`dStar${id}`).innerHTML = starHTML;
                let genre = "";
                if (typeof genre != "undefined") genre = currentGenre.split(",");
                let title = data["Title"];

                const updateMovie = {
                    id,
                    title,
                    rating,
                    movieRated,
                    genre,
                    year,
                    urlPoster
                };

                // Add the new movie to the array
                const url = `/api/movies/${id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateMovie),
                };

                fetch(url, options)
                    .then(response => response.json())
                    .then(newMovie => getMovieDB(newMovie.title)
                        .then(newMovie => {displayMovie(newMovie);
                            // Movie modified
                            $('#update-form').modal('toggle');
                            removeSpinner();
                            displayMessage(title, 2);})
                    )
                    .catch(() => {
                        // Error with the movie
                        $('#update-form').modal('toggle');
                        removeSpinner();
                        displayMessage(newMovieName, 4)
                    });

            } else {
                $('#update-form').modal('toggle');
                removeSpinner();
                // Unable to modify the movie
                displayMessage(title, 3);

            }
        }
    });

}

/**
 *
 * Get the list of movies
 */
const getMovieList = () => {
    // let idArray = [];
    // console.log('get movie list');
    return fetch('/api/movies')
        .then(response => response.json())
        .catch("Error movie ")
};


/** Export functions */
export {
    getMovies,
    addMovie,
    deleteMovie,
    updateMovie,
    getMovieList,
    displayUpdateScreen,
    getMovieDB,
    getMovieInfoId
};