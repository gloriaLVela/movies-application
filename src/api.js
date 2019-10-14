/**Retrieve movies from /api/movies (db.json) set-up in server.js*/
import {getMovieInfoOmdbAPI} from './OMDB_API';
import {displaySpinner, clearAddMovie, removeSpinner, changeCardBackgroundColor} from './manageDOM';
import {displayMovie} from "./buildHTML";

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
                return (movie.title == title);
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

    clearAddMovie();
    let id = 0;
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            //console.log(movies);
            return movies.map(function (movie) {
                return movie.id;
            });
        })
        .then(idArray => {
            //console.log(idArray);

            id = idArray.sort()[idArray.length - 1];
            //console.log(id);

        });

    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";
    //removeSpinner();
    getMovieInfoOmdbAPI(title).then((data) => {
        //console.log(data);
        urlPoster = data["Poster"];
        movieRated = data["Rated"];
        currentGenre = data["Genre"];
        year = data["Year"];

        let genre = "";

        if (currentGenre != undefined) currentGenre.split(",");
        let title = data["Title"];

        // Create the new movie object
        const newMovie = {
            id,
            title,
            rating,
            movieRated,
            genre,
            year,
            urlPoster
        };
        /**
         *
         * Update the movie database
         */

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
                .then(removeSpinner()
                )
            )
            .catch(/* handle errors */);
    });


};

/**
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

    // update database
    fetch(`/api/movies/${id}`, options)
        .then(() => {
            console.log(`movie ${id} deleted`);
            changeCardBackgroundColor();
        })
        .catch(() => {
            console.log('error on delete')
        });

};

/**Update Movie */


//Step 1 Move data from display to update form
const displayUpdateScreen = (id) => {
   // alert('Display update form');
    return fetch(`/api/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
            //console.log(movie);
            let {title, rating, id} = movie;
            //console.log(title);
            document.getElementById("new-name").value = title;
            document.getElementById("new-rating").value = rating;
            document.getElementById("updateMovieID").value = id;

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
        });
};

//Step 2 update movie in database
const updateMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('new-rating').value;
    let title = changeTitleCase('new-name'); //document.getElementById('new-name').value.trim();
    let id = document.getElementById("updateMovieID").value;
    clearAddMovie();

    /** Hide  update form */

    //document.getElementById('update-form').style.display = 'none';
    $("#update-form").modal('toggle');

    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";
    /**
     * Get the movie information
     */
    getMovieInfoOmdbAPI(title).then((data) => {
        //console.log(data);
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
                .then(newMovie => displayMovie(newMovie))
            )
            .catch(/* handle errors */);
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
export {getMovies, addMovie, deleteMovie, updateMovie, getMovieList, displayUpdateScreen, getMovieDB};