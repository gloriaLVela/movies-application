import {selectMovieRatings, selectMovieGenre, starsAddForm, starsUpdateForm} from './add-listeners';

/**
 *
 * Purpose : Functions to handle the DOM
 */

let updateModalStatus = false;

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

    let message = "";

    switch (option) {

        case 1: {
            message = "The movie  '" + title + "' was added to the system.";
            document.getElementById('success').innerHTML = "The movie  '" + title + "' was added to the system.";
            document.getElementById('success').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('danger').style.display = 'none';

            break;
        }
        case 2: {
            message = "The modification to the movie  '" + title + "' is implemented.";

            document.getElementById('success').innerHTML = "The modification to the movie  '" + title + "' is implemented.";
            document.getElementById('success').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('danger').style.display = 'none';

            break;
        }
        case 3:
        {
            message = "The movie '" + title + "' exists in the system.";
            document.getElementById('warning').innerHTML = "The movie '" + title + "' exists in the system.";
            document.getElementById('warning').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('danger').style.display = 'none';
            break;

        }
        case 4 : {
            message = "The movie " + title + " does not exists in the database.";
            document.getElementById('danger').innerHTML = "The movie " + title + " does not exists in the database.";
            document.getElementById('danger').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
            document.getElementById('success').style.display = 'none';

            break;

        }
    }
    $('#non-destructive-message').modal('show');

    let timeoutId = setTimeout(function () {
        $('#non-destructive-message').modal('hide')
    }, 1000);

}

function displayUpdateModal(){
    if (updateModalStatus) {
        alert('screen was displayed');
    }
    updateModalStatus = true;
    $('#update-form').modal('toggle');
}

function hideUpdateModal(){
    if (!updateModalStatus){
    }
    updateModalStatus = false;
    $('#update-form').modal('toggle');

}

function displayCorrectHeadings(){
    if (window.outerWidth <= 480) {
        $('#movie-fields').toggle();

        $('#addMovieForm').click(function () {
            $(this).next().toggle();

        })
    } else {
        document.getElementById('arrowAddMovie').style.display = 'none';
    }
}
export {displaySpinner, clearAddMovie, removeSpinner, initForm, displayMessage,  displayUpdateModal, hideUpdateModal}