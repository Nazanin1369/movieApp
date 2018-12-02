'use strict';

class MovieSearch extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/components/movie-search/movie-search.css';

        let section = document.createElement('section');
        section.setAttribute('class', 'search');

        let searchContainer = document.createElement('div');
        searchContainer.setAttribute('class', 'search__container');

        let searchInput = document.createElement('input');
        searchInput.setAttribute('class', 'search__input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search movies');
        searchInput.setAttribute('list', 'movies');

        searchContainer.appendChild(searchInput);
        section.appendChild(searchContainer);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(section);
    }
}

customElements.define('movie-search', MovieSearch);