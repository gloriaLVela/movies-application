import {selectMovieRatings, selectMovieGenre, starsAddForm, starsUpdateForm} from './add-listeners';

/**
 *
 * Purpose : Functions to handle the DOM
 */
function initForm(){

    selectMovieRatings();

    selectMovieGenre();

    starsAddForm();

    starsUpdateForm();
}

function displaySpinner() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('myDiv').style.display = 'none';
}

function removeSpinner() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('myDiv').style.display = 'block';
}

function clearAddMovie() {
    // Clear the add movie
    document.getElementById('movie-name').value = '';
    // Clear the rating
    for (let i = 1; i <= 5; i++) {
        let cur = document.getElementById("star" + i)
        cur.className = "fa fa-star";
    }
}

export {displaySpinner, clearAddMovie, removeSpinner, initForm}