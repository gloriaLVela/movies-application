import {selectMovieRatings, selectMovieGenre, starsAddForm, starsUpdateForm} from './add-listeners';

/**
 *
 * Purpose : Functions to handle the DOM
 */
function initForm() {

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

function changeCardBackgroundColor() {
    let cards = document.getElementsByClassName('card');
    // console.log(cards);
    let rowCount = 0;
    for (let index = 0; index < cards.length; index++) {
        if (index % 2 == 1) {
            //document.getElementById("MyElement").className = "MyClass";
            cards[index].className = "card odd-movie-card";
        } else {
            cards[index].className = "card";
        }

    }
}

export {displaySpinner, clearAddMovie, removeSpinner, initForm, changeCardBackgroundColor}