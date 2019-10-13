/**
 *
 * Purpose : build the cards for the movie
 */

/**
 *
 * Find the selected ratings
 */

import {addDeleteButtonCard, addUpdateButtonCard} from './add-listeners';
import {removeSpinner} from "./manageDOM";

/**
 * Build the movie d=card
 * @param title -- movie title
 * @param rating -- movie rating (1 -5 stars)
 * @param id -- movie id
 * @param urlPoster -- Movie poster URL
 * @returns {string}
 */

function buildMovieCard(title, rating, id, urlPoster) {
    let html = "";
    html += `<div class="card">`;
    // html += `<h5 class="card-title  h3 text-center" > ${title} </h5>`;
    html += `<div  id="div-img"><img src="${urlPoster}" id="img${id}" > </div>`;

    let starHTML = "";

    for (let i = 0; i < rating; i++) {
        starHTML += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = rating; i < 5; i++) {
        starHTML += `<span class="fa fa-star"></span>`;
    }

    html += ` <div class="star-size star-disp" style="padding: 1em;"  id="dStar${id}"> ${starHTML} </div>`;
    html += `<div class="card-buttons" style="margin-left: 0px; margin-right: 0px">`;
    html += `<div ><button class=" btn btn-success btn-lg btn-block movie-button " id="update${id}"><i class="fa fa-edit"></i></button></div>`;
    html += `<div ><button class=" btn btn-danger btn-lg btn-block movie-button" id="delete${id}"><i class="fa fa-ban"></i></button></div>`;
    html += `</div>`;
    html += `</div>`;
    return html;
}

/**
 *
 * Include the current movie
 *
 * @param movieGenre -- movie genre
 * @param movieRated -- movie rating (PG, PG-13, R, Approved)
 * @returns {boolean} In
 */
function includeThisMovie(movieGenre, movieRated) {

    let includeMovie = false;

    let includeMovieGenre = document.getElementById('selectedGenre').value;
    if (includeMovieGenre.length > 0) {
        let movieGenreList = includeMovieGenre.toLowerCase().split(',');
        if (movieGenre.length != 0) {
            movieGenre.forEach(function (item) {
                if (movieGenreList.indexOf(item.toLowerCase().trim()) >= 0) {
                    includeMovie = true;
                }
            })
        } else {
            includeMovie = false;
        }

    } else {
        includeMovie = true;
    }

    let includeMovieRatings = document.getElementById('selectedRating').value;

    // Check if we are going to include the movie
    if (includeMovie) {
        if (includeMovieRatings.length > 0) {
            let includeMovieRatingList = includeMovieRatings.split(',');
            includeMovie =  (includeMovieRatingList.indexOf(movieRated) >= 0);

        } else {
            includeMovie = true;
        }
    }
    return includeMovie;
}

/**
 * Save the current search
 * @param e
 */
export const saveSearchCriteria = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    // includeMovieGenre = document.getElementById('selectedGenre').value;
    // includeMovieRatings = document.getElementById('selectedRating').value;

}

/**
 * Display the movie
 * @param movies -- list of movies
 */
export function displayMovies(movies) {


    // build stars

    let html = '';
    //let index = 0;
    let idArray = [];
    let titleArray = [];

    movies.forEach(({title, rating, id, urlPoster, genre, movieRated}) => {

        /** Display the movies **/
        if (includeThisMovie(genre, movieRated)) {
            html += ` <div class="movie-card" id="movie${id}">`;
            html += buildMovieCard(title, rating, id, urlPoster);
            html += `</div >`;
            idArray.push(id);
            titleArray.push(title);
        }
    });

    /** Hide  loading gif after page display */
    removeSpinner();


    /**Display movies on screen*/
    document.getElementById('movie-list').innerHTML = html;

    // console.log(html);

    /**Add Event listeners for the delete and the update buttons included in the cards */
    for (let i = 0; i < idArray.length; i++) {
        addDeleteButtonCard(idArray[i], titleArray[i]);
        addUpdateButtonCard(idArray[i]);
    }
}

/**
 *
 * Display the movie
 * @param movie -- selected movie
 * @returns {number}
 */

export function displayMovie(movie) {

    let {title, rating, id, urlPoster, genre, movieRated} = movie[0];

    let movieCardHTML = "";
    //console.log('Display movie ' + title);

    /**
     *  Movie going to be displayed?
     */

    if (includeThisMovie(genre, movieRated)) {
        /**
         *
         * Update movie or add movie
         */

            //let selectedMovie = document.getElementById(`movie${id}`);

        let element = !!document.getElementById(`movie${id}`);

        /** Update movie **/
        if (element) {
            /**
             *  Update the html
             */
            document.getElementById(`movie${id}`).value = buildMovieCard(title, rating, id, urlPoster);

        } else {
            /**
             * Create the card for the new movie and add it to the html
             */
            movieCardHTML = ` <div class="movie-card" id="movie${id}">`;
            movieCardHTML += buildMovieCard(title, rating, id, urlPoster);
            movieCardHTML += `</div >`;
            //console.log(movieCardHTML);
            document.getElementById('movie-list').innerHTML += movieCardHTML;
            /**Add Event listeners for the delete and the update buttons included in the cards */
            addDeleteButtonCard(id, title);
            addUpdateButtonCard(id);
        }
        ;

    } else {
        /** Add message at the bottom of the screen**/
        return 0;
    }


}

