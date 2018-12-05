'use strict';

import NProgress from 'nprogress';
import { fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, map, switchMap } from 'rxjs/operators';

import { ApiService } from '../services/apiService';
import { DomService } from '../services/domService';

class MovieSearch extends HTMLElement {
    constructor() {
        super(); 

        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('style');
        link.textContent = `
        .search__container {
            position: relative;
            top: -35%;
            right: 0%;
            width: 400px;
            padding: 0.5rem;
            margin-right: 20px;}
            .search__input {
                width: 100%;
                outline: none;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: .5rem;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: 1.25rem;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
            .button__clear {
                border:1px solid transparent;
                background-color: transparent;
                display: inline-block;
                vertical-align: middle;
              outline: 0;
              cursor: pointer;
            }
            .button__clear:after {
                content: "X";
                display: block;
                width: 15px;
                height: 15px;
                position: absolute;
                z-index:1;
                top: -30%;
                bottom: 0;
                right: 0;
                margin: auto;
                padding: 2px;
                border-radius: 50%;
                text-align: center;
                color: #141414;;
                font-weight: normal;
                font-size: 12px;
                cursor: pointer;}
                .search__input:not(:valid) ~ .button__clear {
                    display: none;}

            @media screen and (max-width: 500px) {
                .search__container {
                    top: -18%;
                    left: 5px;
                    width: 60%;
                    padding: 0.2rem;
                    margin-right: 15px;} }`;

        let searchContainer = document.createElement('div');
        let searchForm = document.createElement('form');
        let searchInput = document.createElement('input');
        let clearBtn = document.createElement('button');

        searchContainer.setAttribute('class', 'search__container');
        searchInput.setAttribute('class', 'search__input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('required', 'true');
        searchInput.setAttribute('name', 'msearch');
        searchInput.setAttribute('placeholder', 'Search movies');
        clearBtn.setAttribute('class', 'button__clear');
        clearBtn.setAttribute('type', 'reset');

        searchForm.appendChild(searchInput);
        searchForm.appendChild(clearBtn);
        searchContainer.appendChild(searchForm);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(searchContainer);
    }

    connectedCallback() {
        // Attach Event Listeners
        this._searchInput = this.shadowRoot.querySelector('.search__input');
        this._preventFormSubmission();
        this._bindInputEvents();
    }

    disconnectedCallback() {
        this._inputSubscription.unsubscribe();
    }

    _bindInputEvents() {
        this._inputSubscription = fromEvent(this._searchInput, 'keyup')
        .pipe(map(e => e.target.value === '' ?  'Strange' : e.target.value))
        .pipe(debounceTime(750))
        .pipe(distinctUntilChanged())
        .pipe(switchMap(ApiService.searchByTitle))
        .subscribe(movies => {
            NProgress.done();
            DomService.drawMovieCards(movies);
        });
    }

    _preventFormSubmission() {
        this._searchInput.addEventListener('keypress', function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('movie-search', MovieSearch);