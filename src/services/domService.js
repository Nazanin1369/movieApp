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
        const contentContainer = document.getElementsByClassName('container')[0];
        contentContainer.innerHTML = '';

        if(typeof movies  === 'undefined') {
            this.displayNoResult();
            return;
        }

        if (movies.length > 0) {
            for(let movie of movies) {
                let itemEl = document.createElement('movie-card');
                itemEl.setAttribute('title', movie.Title);
                itemEl.setAttribute('poster', movie.Poster);
                itemEl.setAttribute('type', movie.Type);
                itemEl.setAttribute('imdbID', movie.imdbID);
                documentFragmentEl.appendChild(itemEl);
            }
            contentContainer.appendChild(documentFragmentEl);
        } else {
            this.displayErrorContainer();
        }
    }

    /**
     * Displays no result container
     */
    static displayNoResult() {
        this.createMessageContainer('No Movies Found, try another title.');
    }

    /**
     * Displays Error message in case of error
     */
    static displayErrorContainer() {
        this.createMessageContainer('Something went wrong. Please try again.');
    }

    /**
     * @description     Creates the message container and attaches it to the main container
     * @param {string} message  message to display inside the main container
     */
    static createMessageContainer(message) {
        const contentContainer = document.getElementsByClassName('container')[0];
        const noResultEl = document.createElement('div');
        const pEl = document.createElement('p');
        contentContainer.innerHTML = '';
        noResultEl.setAttribute('class', 'no-result__container');
        pEl.textContent = message;
        noResultEl.appendChild(pEl);
        contentContainer.appendChild(noResultEl);
    }
}