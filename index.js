'use strict';

import './styles/inline.css';
import './src/components/movie-card/movie-card';
import './src/components/movie-search/movie-search';

export class MovieApp {
    constructor() {
        this.loadInitialMovies();
    }

    loadInitialMovies() {
        fetch('http://www.omdbapi.com/?apikey=aba065d3&s=Beauty')
        .then(response => response.json())
        .then(data => {
            let netflixMovies = data.Search;
            let documentFragmentEl = document.createDocumentFragment();
            const contentContainer = document.getElementsByClassName('main')[0];
            contentContainer.innerHTML = '';

            for(let movie of netflixMovies) {
                let itemEl = document.createElement('movie-card');
                itemEl.setAttribute('title', movie.Title);
                itemEl.setAttribute('poster', movie.Poster);
                itemEl.setAttribute('type', movie.Type);
                itemEl.setAttribute('imdbID', movie.imdbID);
                
                documentFragmentEl.appendChild(itemEl);
            }

            contentContainer.appendChild(documentFragmentEl);
        })
        .catch(error => {
            return console.error('There has been a problem with your fetch operation: ', error.message);
        });
    }
}

new MovieApp();

