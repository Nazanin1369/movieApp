'use strict';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, map, switchMap } from 'rxjs/operators';

class MovieSearch extends HTMLElement {
    constructor() {
        super(); 

        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('style');
        // link.rel = 'stylesheet';
        // link.href = './dist/movie-search.css';
        link.textContent = `
        .search {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
                -ms-flex-direction: row;
                    flex-direction: row;
            -webkit-flex-wrap: nowrap;
                -ms-flex-wrap: nowrap;
                    flex-wrap: nowrap;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
                      -ms-flex-pack: center;
                    justify-content: center;
            -webkit-box-align: stretch;
            -webkit-align-items: stretch;
                -ms-flex-align: stretch;
                    align-items: stretch;
            -webkit-align-content: center;
                -ms-flex-line-pack: center;
                    align-content: center;
            padding: 65px 5px 5px;
            color: #FFF;
            background:#444;}
            .search__container {
            width: 50%;
            padding: .5rem;}
                .search__input {
                width: 100%;
                outline: none;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: 1.25rem;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
        `

        let section = document.createElement('section');
        let searchContainer = document.createElement('div');
        let searchInput = document.createElement('input');
        let searchResults = document.createElement('datalist');

        section.setAttribute('class', 'search');
        searchContainer.setAttribute('class', 'search__container');
        searchInput.setAttribute('class', 'search__input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search movies');
        searchInput.setAttribute('list', 'movies');
        searchResults.setAttribute('id', 'movies');

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchResults);
        section.appendChild(searchContainer);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(section);
    }

    connectedCallback() {
        // Attach Event Listeners
        this._searchInput = this.shadowRoot.querySelector('.search__input');

        this._inputSubscription = fromEvent(this._searchInput, 'keyup')
            .pipe(map(e => e.target.value))
            .pipe(filter(text => text.length > 2))
            .pipe(debounceTime(750))
            .pipe(distinctUntilChanged())
            .pipe(switchMap(this._search))
            .subscribe(movies => this._buildDataList(movies));
    }

    disconnectedCallback() {
        this._inputSubscription.unsubscribe();
    }

    _search(title) {
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&s=${title}`)
        .then(response => response.json())
        .then(data => data.Search)
        .catch(error => {
            return Observable.throw('There has been a problem with your fetch operation: ', error.message);
        });
    }

    _buildDataList(items) {
        this._updateMovieCards(items)
        let documentFragmentEl = document.createDocumentFragment();
        for(let item of items) {
            let itemEl = document.createElement('option');
            itemEl.setAttribute('value', item.Title);
            documentFragmentEl.appendChild(itemEl);
        }

        this.shadowRoot.getElementById('movies').appendChild(documentFragmentEl);

    }

    _updateMovieCards(items) {
        const contentContainer = document.getElementsByClassName('main')[0];
        contentContainer.innerHTML = '';

        let documentFragmentEl = document.createDocumentFragment();
        for(let item of items) {
            let itemEl = document.createElement('movie-card');
            itemEl.setAttribute('title', item.Title);
            itemEl.setAttribute('poster', item.Poster);
            itemEl.setAttribute('type', item.Type);
            
            documentFragmentEl.appendChild(itemEl);
        }

        contentContainer.appendChild(documentFragmentEl);

    }
}

customElements.define('movie-search', MovieSearch);