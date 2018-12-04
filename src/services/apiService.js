'use strict';

import NProgress from 'nprogress';

/**
 * Service to interface OMDB API
 */
export class ApiService  {
    /**
     * @description retrieves movie information by title
     * @param {string} title name of a movie/tv show
     * @returns {Promise} fetch Promise
     */
    static searchByTitle (title)  {
        NProgress.start();
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&s=${title}`)
            .then(response => response.json())
            .then(data => {
                NProgress.done();
                return data.Search;
            })
            .catch(error => {
                NProgress.done();
                return error;
            });
    }

    /**
     * @description retrieves detailed information about the movie or tv show
     * @param {string} imdbId id of the movie or tv show IMDB
     * @returns {Promise} fetch Promise
     */
    static searchByImdbId(imdbId) {
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&i=${imdbId}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                return console.log('There has been a problem with your fetch operation: ', error.message);
            });
    }
}