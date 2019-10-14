/**
 *
 * Purpose:
 */

import {getMovies, getMovieList} from './api';
import {displayMovies} from './buildHTML';
import {initForm} from "./manageDOM";

/**
 *
 * Initialize the form
 */

initForm();

/**Displays all movies in the console */

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch(() => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
});

/**Display movies on the screen*/
getMovieList().then(movies => {
    displayMovies(movies)
});



