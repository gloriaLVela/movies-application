export const getMovieInfoOmdbAPI = (title) => {
    /**
     *
     * Purpose : Handle the API called to the OMDB-API
     */


    /**
     *  Fetch the data from the OmdbAPI */
    let newTitle = title.split(' ').join('+');

    return fetch(`https://www.omdbapi.com/?t=${newTitle}?&apikey=63c8d483`)
        .then(response => response.json());
}
