/**
 *
 * Purpose : Generate the HTML to display the movies
 */


import {addDeleteButtonCard, addUpdateButtonCard} from './add-listeners';
import {removeSpinner} from "./manageDOM";

/**
 * Build the movie d=card
 * @param title -- movie title
 * @param rating -- movie rating (1 -5 stars)
 * @param id -- movie id
 * @param urlPoster -- Movie poster URL
 * @returns html uild the card - the html to b
 */
function buildMovieCard(title, rating, id, urlPoster) {
    let html = "";
    html += `<div class="card">`;
    html += `<h6 class="card-title  text-center" > ${title} </h6>`;
    html += `<div  id="div-img${id}" class="img-fluid movie-poster" ><img src="${urlPoster}" id="img${id}" alt="${title}"> </div>`;

    let starHTML = "";

    for (let i = 0; i < rating; i++) {
        starHTML += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = rating; i < 5; i++) {
        starHTML += `<span class="fa fa-star"></span>`;
    }

    html += ` <div class="star-size star-disp" style="padding: 1em;"  id="dStar${id}"> ${starHTML} </div>`;
    html += `<div class="card-buttons" style="margin-left: 0px; margin-right: 0px">`;
    html += `<div ><button class=" btn btn-success btn-lg btn-block movie-button dark-blue" id="update${id}"><i class="fa fa-edit"></i></button></div>`;
    html += `<div ><button class=" btn btn-danger btn-lg btn-block movie-button dark-red" id="delete${id}"><i class="fa fa-ban"></i></button></div>`;
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
 * @returns {boolean} -- include movie true/false
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
 * Display the movie
 * @param movies -- list of movies
 */
export function displayMovies(movies) {

    // Build rating stars
    let html = '';
    let idArray = [];
    let titleArray = [];

    movies.forEach(({title, rating, id, urlPoster, genre, movieRated}) => {
        //Display the movies
        if (includeThisMovie(genre, movieRated)) {
            html += ` <div class="movie-card" id="movie${id}">`;
            html += buildMovieCard(title, rating, id, urlPoster);
            html += `</div >`;
            idArray.push(id);
            titleArray.push(title);
        }
    });

    // Hide  loading gif after page display
    removeSpinner();

    // Display movies on screen
    document.getElementById('right-pane').innerHTML = html;

    // Add Event listeners for the delete and the update buttons included in the cards
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

    // console.log(movie);
    // Find if we are going to display the movie
    if (includeThisMovie(genre, movieRated)) {

        // Update or add movie
        let element = document.getElementById(`movie${id}`);
        //console.log(element);
        // Update movie
        if (element) {
            document.getElementById(`movie${id}`).value = buildMovieCard(title, rating, id, urlPoster);

        } else {

            // Create the card for the new movie and add it to the html

            let movie_card = document.createElement('div');
            // movie_card.class = "movie-card";
            movie_card.setAttribute('class', 'movie-card');
            movie_card.setAttribute('id', `movie${id}`);
            movie_card.setAttribute('name', `movie${id}`);
            //movie_card.appendChild(div);

            document.getElementById('right-pane').appendChild(movie_card);
            document.getElementById(`movie${id}`).innerHTML =  buildMovieCard(title, rating, id, urlPoster);
            // console.log(document.getElementById(`movie${id}`));
            addDeleteButtonCard(id, title);
            addUpdateButtonCard(id);
        }
        ;

    }


}

