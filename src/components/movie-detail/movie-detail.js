'use strict';

class MovieDetail extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/components/movie-detail/movie-detail.css';

        // Create Card Elements
        let tooltip = document.createElement('div');
        tooltip.setAttribute('class', 'tooltip');

        let info1 = document.createElement('p');
        let info2 = document.createElement('p');
       

        const movieYear = this.getAttribute('year');
        const movieRating = this.getAttribute('rating');

        info1.textContent = movieYear;
        info2.textContent = movieRating;

        tooltip.appendChild(info1);
        tooltip.appendChild(info2);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(tooltip);
    }
}

customElements.define('movie-detail', MovieDetail);