'use static';

/**
 * This service is handles all interactions with adding movies to the main container
 */
export class DomService {
    /**
     * @description Attaches movies cards to the DOM
     * @param {Array<Object>} movies set of movies as a serach result
     */
    static drawMovieCards(movies) {
        let documentFragmentEl = document.createDocumentFragment();
        const contentContainer = document.getElementsByClassName('main')[0];
        contentContainer.innerHTML = '';

        for(let movie of movies) {
            let itemEl = document.createElement('movie-card');
            itemEl.setAttribute('title', movie.Title);
            itemEl.setAttribute('poster', movie.Poster);
            itemEl.setAttribute('type', movie.Type);
            itemEl.setAttribute('imdbID', movie.imdbID);
            
            documentFragmentEl.appendChild(itemEl);
        }
        contentContainer.appendChild(documentFragmentEl);
    }

    /**
     * Displays no result container
     */
    static displayNoResult() {
        const contentContainer = document.getElementsByClassName('main')[0];
        contentContainer.innerHTML = '';
        
        const noResultEl = document.createElement('div');
        const pEl = document.createElement('p');
        noResultEl.setAttribute('class', 'no-result__container');
        pEl.textContent = 'No Movies Found, try another title.';
        noResultEl.appendChild(pEl);
        contentContainer.appendChild(noResultEl);
    }

    /**
     * Displays Error message in case of error
     */
    static displayErrorContainer() {
        contentContainer.innerHTML = '';
        
        const noResultEl = document.createElement('div');
        const pEl = document.createElement('p');
        noResultEl.setAttribute('class', 'no-result__container');
        pEl.textContent = 'Something went wrong. Please try again.';
        noResultEl.appendChild(pEl);
        contentContainer.appendChild(noResultEl);
    }
}