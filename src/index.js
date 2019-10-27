/**
 *
 * Purpose: The index.js is the top level module
 */

import {getMovies, getMovieList} from './api';
import {displayMovies} from './buildHTML';
import {initForm} from "./manageDOM";

/**
 *
 * Initialize the form
 */
initForm();

let movieTitleArray = [];
let movieIdArray = [];


/**Displays all movies in the console */
// Keep for test purpose

getMovies().then((movies) => {
    //console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        //console.log(`id#${id} - ${title} - rating: ${rating}`);
        movieTitleArray.push(title);
        movieIdArray.push(id);
    });
}).catch(() => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
});

function addMovieArray(title) {
    let nextId = movieIdArray[movieIdArray.length - 1] + 1;
    movieTitleArray.push(title);
    movieIdArray.push(nextId);
    return false;
}

function checkDuplicateMovie(title, id) {

    let currentIndex = -1;

    for (let i = 0; i < movieTitleArray.length;  i++ ){
        if ( movieTitleArray[i] == title) {
            currentIndex = i;

        }
    }
    // New movie
    if (id === 0) {
        return (currentIndex >= 0);
    }

   // Title update
    let movieIndex = -1;
    if (currentIndex >= 0){
        movieIndex = movieIdArray[currentIndex];
    }
    return ((movieIndex - parseInt(id.trim())) != 0);

}

function removeMovieList(id) {

    let currentIndex = movieIdArray.indexOf(parseInt(id));
    movieTitleArray.splice(currentIndex, 1);
    movieIdArray.splice(currentIndex, 1);
    return false;
}

/**Display movies on the screen*/
getMovieList().then(movies => {
    displayMovies(movies)
});



export {addMovieArray, checkDuplicateMovie, removeMovieList}

