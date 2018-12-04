'use strict';

import '../styles/inline.css'
import './components/movie-card/movie-card.css';
import './components/movie-card/movie-card';
import './components/movie-search/movie-search';

import { ApiService } from './apiService';
import { DomService } from './domService';

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
        ApiService.searchByTitle('Strange')
            .then(movies => DomService.drawMovieCards(movies))
            .catch( error => console.log(error));
    }
}

// Instantiates the application
new MovieApp();


