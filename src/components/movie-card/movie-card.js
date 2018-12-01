'use strict';

class MovieCard extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/components/movie-card/movie-card.css';

        // Create Card Elements
        let card = document.createElement('div');
        card.setAttribute('class', 'card card-shadow--2dp');

        let cardTitle = document.createElement('div');
        cardTitle.setAttribute('class', 'card__title card--expand');

        let cardText = document.createElement('div');
        cardText.setAttribute('class', 'card__supporting-text');

        let cardActions = document.createElement('div');
        cardActions.setAttribute('class', 'card__actions card--border');

        let cardTitleH2 = document.createElement('h2');
        let cardTitleSpan = document.createElement('span');
        cardTitleH2.setAttribute('class', 'card__title-text');
        

        // Attach Event Listeners
        const showDetailTooltip = (event) => {
            console.log('show dialog')
        }
        
        const hideDetailTooltip = (event) => {
            console.log('hide dialog')
        }
        cardTitleH2.addEventListener('mouseover', showDetailTooltip);
        cardTitleH2.addEventListener('mouseout', hideDetailTooltip);

        // Transport the data
        const movieTitle = this.getAttribute('title');
        const movieDesc = this.getAttribute('desc');
        const movieYear = this.getAttribute('year');
        const movieRating = this.getAttribute('rating');
        const movieGenre = this.getAttribute('genre');

        // Construct the element
        cardTitleSpan.textContent = movieTitle;
        cardText.textContent = movieDesc;
        cardActions.textContent = movieGenre;

        cardTitleH2.appendChild(cardTitleSpan);
        cardTitle.appendChild(cardTitleH2);

        card.appendChild(cardTitle);
        card.appendChild(cardText);
        card.appendChild(cardActions);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(card);
    }
}

customElements.define('movie-card', MovieCard);

