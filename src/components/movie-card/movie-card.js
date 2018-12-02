'use strict';

class MovieCard extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/components/movie-card/movie-card.css';

        // Transport the data
        const movieTitle = this.getAttribute('title');
        const movieDesc = this.getAttribute('desc');
        const movieYear = this.getAttribute('year');
        const movieRating = this.getAttribute('rating');
        const movieGenre = this.getAttribute('genre');
        const movieDirector = this.getAttribute('director');

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

        let tooltip = document.createElement('div');
        let tooltipP1 = document.createElement('p');
        let tooltipP2 = document.createElement('p');
        let tooltipP3 = document.createElement('p');
        let tooltipP4 = document.createElement('p');

        tooltip.setAttribute('class', 'tooltip');
        tooltip.style.display = 'none';
        tooltipP1.textContent = movieTitle;
        tooltipP2.textContent = movieYear;
        tooltipP3.textContent = movieDirector;
        tooltipP4.textContent = movieRating;
        tooltip.appendChild(tooltipP1);
        tooltip.appendChild(tooltipP2);
        tooltip.appendChild(tooltipP3);
        tooltip.appendChild(tooltipP4);
      

        // Attach Event Listeners
        const showDetailTooltip = (event) => {
            let tooltip = this.shadowRoot.querySelector('.tooltip');
            tooltip.style.display = 'block';
            tooltip.classList.add('is-active');
            
        }
        
        const hideDetailTooltip = (event) => {
            let tooltip = this.shadowRoot.querySelector('.tooltip');
            tooltip.style.display = 'none';
            tooltip.classList.remove('is-active');
        }

        cardTitleH2.addEventListener('mouseover', showDetailTooltip);
        cardTitleH2.addEventListener('mouseout', hideDetailTooltip);

        // Construct the element
        cardTitleSpan.textContent = movieTitle;
        cardText.textContent = movieDesc;
        cardActions.textContent = movieGenre;

        cardTitleH2.appendChild(cardTitleSpan);
        cardTitle.appendChild(cardTitleH2);

        card.appendChild(cardTitle);
        card.appendChild(cardText);
        card.appendChild(cardActions);
        card.appendChild(tooltip);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(card);
    }
}

customElements.define('movie-card', MovieCard);

