'use strict';

import '../styles/inline.css'
import './components/movie-card';
import './components/movie-search';
import '../service-worker';

import { ApiService } from './services/apiService';
import { DomService } from './services/domService';

/**
 * Application Main Class
 */
export class MovieApp {
    constructor() {
        // this.registerServiceWorker();
        this.loadInitialMovies();
    }

    /**
     * Loads intial movies on the first load.
     */
    loadInitialMovies() {
        console.log('loading initial movies')
        ApiService.searchByTitle('Strange')
            .then(movies => DomService.drawMovieCards(movies))
            .catch( error => console.log(error));
    }

    registerServiceWorker() {
        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.register('../service-worker.js').then(function(registration) {
        //         // Registration was successful
        //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
        //     }).catch(function(err) {
        //         // registration failed :(
        //         console.log('ServiceWorker registration failed: ', err);
        //     });
        // }
    }
}

// Instantiates the application
new MovieApp();




