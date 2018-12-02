'use strict';

class MovieSearch extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/components/movie-search/movie-search.css';

        let section = document.createElement('section');
        let searchContainer = document.createElement('div');
        let searchInput = document.createElement('input');
        let searchResults = document.createElement('datalist');
        let result1 = document.createElement('option');
        let result2 = document.createElement('option');

        section.setAttribute('class', 'search');
        searchContainer.setAttribute('class', 'search__container');
        searchInput.setAttribute('class', 'search__input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search movies');
        searchInput.setAttribute('list', 'movies');
        searchResults.setAttribute('id', 'movies');
        result1.setAttribute('value', 'res1');
        result2.setAttribute('value', 'res2');

        searchResults.appendChild(result1);
        searchResults.appendChild(result2);
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchResults);
        section.appendChild(searchContainer);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(section);

        this.search('hello');
    }

    search(title) {
        fetch(`http://www.omdbapi.com/?apikey=aba065d3&s=${title}`)
        .then(response => response.json())
        .then(data => {
           return this.buildDataList(data.Search);
        })
        .catch(error => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }

    buildDataList(items) {
        let documentFragmentEl = document.createDocumentFragment();
        for(let item of items) {
            console.log(item);
            let itemEl = document.createElement('option');
            itemEl.setAttribute('value', item.Title);
            documentFragmentEl.appendChild(itemEl);
        }

        this.shadowRoot.getElementById('movies').appendChild(documentFragmentEl);
    }
}

customElements.define('movie-search', MovieSearch);