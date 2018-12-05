'use strict';

import '../styles/inline.css'
import './components/movie-card';
import './components/movie-search';

import { ApiService } from './services/apiService';
import { DomService } from './services/domService';

/**
 * Application Main Class
 */
export class MovieApp {
    constructor() {
        this.loadInitialMovies();
    }

    /**
     * Loads intial movies on the first load.
     */
    loadInitialMovies() {
        console.log('loading initial movies')
        ApiService.searchByTitle('Strange')
            .then(movies => {
                if(typeof movies  === "undefined") {
                    DomService.displayErrorContainer();
                    return;
                }
                if (movies.length > 0) {
                    DomService.drawMovieCards(movies);
                } else {
                    DomService.displayNoResult();
                }
            })
            .catch( error => DomService.displayErrorContainer());
    }
}
// Instantiates the application
new MovieApp();




