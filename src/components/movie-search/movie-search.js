'use strict';
import { fromEvent, Observable } from 'rxjs';
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
            padding: 60px 5px 5px;
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

        section.setAttribute('class', 'search');
        searchContainer.setAttribute('class', 'search__container');
        searchInput.setAttribute('class', 'search__input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search movies');

        searchContainer.appendChild(searchInput);
        section.appendChild(searchContainer);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(section);
    }

    connectedCallback() {
        // Attach Event Listeners
        this._searchInput = this.shadowRoot.querySelector('.search__input');

        this._inputSubscription = fromEvent(this._searchInput, 'keyup')
            .pipe(map(e => e.target.value))
            .pipe(debounceTime(750))
            .pipe(distinctUntilChanged())
            .pipe(switchMap(this._search))
            .subscribe(movies => {
                if(movies && movies.length) {
                    this._updateMovieCards(movies)
                } else {
                    this._displayNoResult();
                }
            });
    }

    disconnectedCallback() {
        this._inputSubscription.unsubscribe();
    }

    _search(title) {
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&s=${title}`)
        .then(response => response.json())
        .then(data => data.Search)
        .catch(error => {
            return console.error('There has been a problem with your fetch operation: ', error.message);
        });
    }

    _updateMovieCards(items) {
        let documentFragmentEl = document.createDocumentFragment();
        const contentContainer = document.getElementsByClassName('main')[0];
        contentContainer.innerHTML = '';

        for(let item of items) {
            let itemEl = document.createElement('movie-card');
            itemEl.setAttribute('title', item.Title);
            itemEl.setAttribute('poster', item.Poster);
            itemEl.setAttribute('type', item.Type);
            itemEl.setAttribute('imdbID', item.imdbID);
            
            documentFragmentEl.appendChild(itemEl);
        }

        contentContainer.appendChild(documentFragmentEl);
    }

    _displayNoResult() {
        const contentContainer = document.getElementsByClassName('main')[0];
        contentContainer.innerHTML = '';
        
        const noResultEl = document.createElement('div');
        const pEl = document.createElement('p');
        noResultEl.setAttribute('class', 'no-result__container');
        pEl.textContent = 'No Movies Found, try another title.';
        noResultEl.appendChild(pEl);
        contentContainer.appendChild(noResultEl);
    }
}

customElements.define('movie-search', MovieSearch);