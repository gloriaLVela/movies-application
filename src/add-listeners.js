import {addMovie, updateMovie, getMovieList, deleteMovie, displayUpdateScreen} from './api';

import {displayMovies, saveSearchCriteria} from './buildHTML';

/**
 *
 * Purpose: Add the event listeners
 */


/**
 *  Select movie rating
 *
 * */
export function selectMovieRatings() {

    const movieRatingElements = document.getElementsByClassName('movie-rating');
    for (let element of movieRatingElements) {
        //console.log(element.id);
        document.getElementById(element.id).addEventListener('click', function () {

            //Find the selected ratings
             let selectedMovieRatings = document.getElementsByClassName("movie-rating");

            let movieRatings = Array.from(selectedMovieRatings);

            let includeMovieRatings = movieRatings.filter(function (checkBox) {
                return (checkBox["checked"] === true);
            });

            includeMovieRatings = includeMovieRatings.map(rating => {
                return rating.value;
            });

            document.getElementById('selectedRating').value = includeMovieRatings;
            getMovieList().then(movies => {
                displayMovies(movies)
            });
        })

    }
    ;

}

/**
 *  Select movie genre
 *
 * */
export function selectMovieGenre() {

    const movieGenreElements = document.getElementsByClassName('genre');
    for (let element of movieGenreElements) {
        document.getElementById(element.id).addEventListener('click', function () {

            // Find the selected genre
            let selectedMovieGenre = document.getElementsByClassName("genre");

            let movieGenre = Array.from(selectedMovieGenre);

            let includeMovieGenre = movieGenre.filter(function (checkBox) {
                return (checkBox["checked"] === true);
            });

            includeMovieGenre = includeMovieGenre.map(rating => {
                return rating.value;
            });

            document.getElementById('selectedGenre').value = includeMovieGenre;
            getMovieList().then(movies => {
                displayMovies(movies)
            });

        });
    }
    ;
};



/**
 *
 *
 * Handle the stars in the Add form.
 */
export function starsAddForm() {

    for (let i = 1; i <= 5; i++) {
        document.getElementById("star" + i).addEventListener("click", function () {
            var lastStar = this.id.replace("star", "");
            for (var i = 1; i <= 5; i++) {
                var cur = document.getElementById("star" + i)
                cur.className = "fa fa-star"
            }
            for (var i = 1; i <= lastStar; i++) {
                var cur = document.getElementById("star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
            document.getElementById('rating').value = lastStar;
        });
    }
    ;
}

/**
 *
 *
 * Handle the stars in the Update form.
 */
export function starsUpdateForm() {

    for (let i = 1; i <= 5; i++) {
        document.getElementById("update-star" + i).addEventListener("click", function () {
            // console.log(ths);
            //console.log(this);
            var lastStar = this.id.replace("update-star", "");
            for (var i = 1; i <= 5; i++) {
                var cur = document.getElementById("update-star" + i)
                cur.className = "fa fa-star"
            }
            for (var i = 1; i <= lastStar; i++) {
                var cur = document.getElementById("update-star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
            document.getElementById('new-rating').value = lastStar;
        });
    }
}

/** Handle the add button*/

document.getElementById("add-movie").addEventListener('click', event => {
    addMovie(event);
});


/** Handle the update button in the card **/
export function addUpdateButtonCard(id) {
    document.getElementById(`update${id}`).addEventListener('click', event => {
        document.getElementById('currentMovieID').value = id;
        $('#update-form').modal('toggle');
        displayUpdateScreen(id);
    });

}

/** Handle the confirm update **/
$('#update-form').on('show.bs.modal', function (e) {
    document.getElementById('confirmUpdateMovie').addEventListener('click', event => {
        // alert('Update this movie ');
        let id = document.getElementById('currentMovieID').value;
        updateMovie(event);


    });

});


/** Handle the delete button in the card **/
export function addDeleteButtonCard(id, title) {
    document.getElementById(`delete${id}`).addEventListener('click', event => {
        /** Display the delete pop up */
        document.getElementById('currentMovieID').value = id;
        $("#confirm-delete").modal('toggle');
        document.getElementById("deleteMovieInformation").innerText = "Do you want to delete the movie " + title + "?";

    });
}

/** Handle the confirm delete **/
$('#confirm-delete').on('show.bs.modal', function (e) {
    document.getElementById('confirmDeleteMovie').addEventListener('click', event => {
        // alert('Delete movie ');
        let id = document.getElementById('currentMovieID').value;

        var elem = document.querySelector(`#movie${id}`);
        elem.parentNode.removeChild(elem);
        deleteMovie(id);
        $("#confirm-delete").modal('toggle');

    });

});

/** Handle the cancel delete **/
document.getElementById('cancelDelete').addEventListener('click', event => {
    $("#confirm-delete").modal('toggle');
});


//Toggle the rating options
document.getElementById('ratingID').addEventListener('click', event =>{
    if (document.getElementById('rating-options').className === 'hide-elements'){
        document.getElementById('rating-options').className = "";
    } else {
        document.getElementById('rating-options').className = 'hide-elements';
    };
});

// Toggle the genre options
document.getElementById('genreID').addEventListener('click', event =>{
    if (document.getElementById('genre-options').className === 'hide-elements'){
        document.getElementById('genre-options').className = "";
    } else {
        document.getElementById('genre-options').className = 'hide-elements';
    };
});





