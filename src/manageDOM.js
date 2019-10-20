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

    displayCorrectHeadings();


}

function displaySpinner() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('main-div').style.display = 'none';
}

function removeSpinner() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-div').style.display = 'block';
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

function displayMessage(title, option){
    switch (option) {

        case 1: {
            document.getElementById('success').innerHTML = "The movie  '" + title + "' was added to the system.";
            document.getElementById('success').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('danger').style.display = 'none';
            break;
        }
        case 2: {
            document.getElementById('success').innerHTML = "The modification to the movie  '" + title + "' is implemented.";
            document.getElementById('success').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('danger').style.display = 'none';
            break;
        }
        case 3:
        {
           document.getElementById('warning').innerHTML = "The movie '" + title + "' exists in the system.";
            document.getElementById('warning').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('danger').style.display = 'none';
            break;

        }
        case 4 : {
            document.getElementById('danger').innerHTML = "The movie " + title + " does not exists in the database.";
            document.getElementById('danger').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('success').style.display = 'none';
            break;

        }
    }
     $('#non-destructive-message').modal('toggle');

    let timeoutId = setTimeout(function () {
        $('#non-destructive-message').modal('toggle')
    }, 3000);
}

function displayCorrectHeadings(){
    if (window.outerWidth <= 480) {
        $('#movie-fields').toggle();

        $('#addMovieForm').click(function () {
            //document.getElementById("arrowAddMovie").style.class = "fas fa-angle-double-down";
            $(this).next().toggle();

        })
    } else {
        document.getElementById('arrowAddMovie').style.display = 'none';
       // $("#arrowAddMovie").style().css('display', 'none');
        //console.log($("#arrowAddMovie"));
    }
}
export {displaySpinner, clearAddMovie, removeSpinner, initForm, displayMessage}