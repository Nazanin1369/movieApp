'use strict';

import { fromEvent, Observable, merge } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, map, switchMap } from 'rxjs/operators';

class MovieCard extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});

        const link = document.createElement('style');
        // link.rel = 'stylesheet';
        // link.href = './movie-card.css';
        link.textContent = `
        .card-shadow--2dp {
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);}
          
        .card {
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex: 1 25%;
              -ms-flex: 1 25%;
                  flex: 1 25%;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
          font-size: 16px;
          font-weight: 400;
          min-height: 300px;
          overflow: hidden;
          min-width: 200px;
          max-width: 200px;
          position: relative;
          margin: 1.5rem;
          background: #ccc;
          border-radius: 2px;
          box-sizing: border-box; }
        .card:hover {
            border: 3px solid #e50914;
        }
        
        .card__image {
            max-height: 300px;}
        
        .card__title { 
          -webkit-align-items: center;
              -ms-flex-align: center;
                  align-items: center;
          color: #fff;
          display: block;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-justify-content: stretch;
                    -ms-flex-pack: stretch;
                  justify-content: stretch;
          line-height: normal;
          padding: 0;
          -webkit-perspective-origin: 165px 56px;
                  perspective-origin: 165px 56px;
          -webkit-transform-origin: 165px 56px;
                  transform-origin: 165px 56px;
          box-sizing: border-box; }
          .card__title.card--border {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
        
        .card__title-text {
          -webkit-align-self: flex-end;
              -ms-flex-item-align: end;
                  align-self: flex-end;
          color: inherit;
          display: block;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          font-size: 24px;
          font-weight: 300;
          line-height: normal;
          overflow: hidden;
          -webkit-transform-origin: 149px 48px;
                  transform-origin: 149px 48px;
          margin: 0; }
          .card__title-text span {
            color: #fff; 
            letter-spacing: -1px; 
            font-weight: 400;
            background: rgb(0, 0, 0); /* fallback color */
            background: rgba(0, 0, 0, 0.7);
            padding: 10px; }
        
        .card__subtitle-text {
          font-size: 14px;
          color: rgba(0,0,0, 0.54);
          margin: 0; }
        
        .card__supporting-text {
          color: rgba(0,0,0, 0.54);
          font-size: 1rem;
          line-height: 18px;
          overflow: hidden;
          padding: 16px 16px;
          width: 90%; }
          .card__supporting-text.card--border {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
        
        .card__actions {
          font-size: 16px;
          line-height: normal;
          width: 100%;
          background-color: transparent;
          padding: 8px;
          box-sizing: border-box; }
          .card__actions.card--border {
            border-top: 1px solid rgba(0, 0, 0, 0.1); }
        
        .card--expand {
            -webkit-flex-grow: 1;
                -ms-flex-positive: 1;
                    flex-grow: 1; }

        .overlay {
            position: absolute; 
            top: 0; 
            background: rgb(0, 0, 0);
            background: rgba(0, 0, 0, 0.7);
            color: #f1f1f1; 
            width: 100%;
            transition: .5s ease;
            opacity:0;
            color: white;
            font-size: 12px;
            line-height: 2rem;
            padding: 10px;
            z-index: 2;
            text-align: left;}
            .overlay p > strong {
                padding-right: 5px;}
        
        @-webkit-keyframes pulse {
          0% {
            -webkit-transform: scale(0);
                    transform: scale(0);
            opacity: 0; }
          50% {
            -webkit-transform: scale(0.99);
                    transform: scale(0.99); }
          100% {
            -webkit-transform: scale(1);
                    transform: scale(1);
            opacity: 1;
            visibility: visible; } }
        
        @keyframes pulse {
          0% {
            -webkit-transform: scale(0);
                    transform: scale(0);
            opacity: 0; }
          50% {
            -webkit-transform: scale(0.99);
                    transform: scale(0.99); }
          100% {
            -webkit-transform: scale(1);
                    transform: scale(1);
            opacity: 1;
            visibility: visible; } }

        @media screen and (max-width: 500px) {
            .card {
                min-width: 100px;
                max-width: 100px;
                min-height: 200px;
                margin: 0.1rem;}
            .card__image {
                min-width: 100px;
                max-width: 100px;
                max-height: 200px;
            }
            .overlay {
                font-size: 10px;
                line-height: .5rem;
                padding: 2px;
                z-index: 2;} }
        `;

        // Create Card Elements
        let card = document.createElement('div');
        card.setAttribute('class', 'card card-shadow--2dp');

        let cardTitle = document.createElement('div');
        let cardTitleImg = document.createElement('img');
        let cardTitleImgOverlay = document.createElement('div');
        let cardText = document.createElement('div');
        let cardActions = document.createElement('div');
        cardTitle.setAttribute('class', 'card__title card--expand');
        cardTitleImg.setAttribute('class', 'card__image');
        cardTitleImgOverlay.setAttribute('class', 'overlay');
        cardText.setAttribute('class', 'card__supporting-text');
        cardActions.setAttribute('class', 'card__actions card--border');

        let overlay = document.createElement('div');
        let titleP = document.createElement('p');
        let yearP = document.createElement('p');
        let directorP = document.createElement('p');
        let imdbP = document.createElement('p');
        titleP.setAttribute('class', 'titleP');
        yearP.setAttribute('class', 'yearP');
        directorP.setAttribute('class', 'directorP');
        imdbP.setAttribute('class', 'imdbP');

        cardTitleImgOverlay.appendChild(titleP);
        cardTitleImgOverlay.appendChild(yearP);
        cardTitleImgOverlay.appendChild(directorP);
        cardTitleImgOverlay.appendChild(imdbP);
    
        cardTitle.appendChild(cardTitleImg);
        cardTitle.appendChild(cardTitleImgOverlay);
        card.appendChild(cardTitle);
        card.appendChild(cardText);
        card.appendChild(cardActions);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(card);
    }

    connectedCallback() {
        this._cardTitle = this.shadowRoot.querySelector('.card__supporting-text');

        this._setCardInfo();
        this._bindShowEvents(this._cardTitle);
        this._bindHideEvents(this._cardTitle);
    }

    _showDetailOverlay(detail) {
        let overlay = this.shadowRoot.querySelector('.overlay');
        this.shadowRoot.querySelector('.titleP').innerHTML = `<strong>Title:</strong>${detail.Title}`;
        this.shadowRoot.querySelector('.yearP').innerHTML = `<strong>Year:</strong>${detail.Year}`;
        this.shadowRoot.querySelector('.directorP').innerHTML = `<strong>Director:</strong>${detail.Director}`;
        this.shadowRoot.querySelector('.imdbP').innerHTML = `<strong>IMDB:</strong>${detail.imdbRating}`;
    
        overlay.style.opacity = '1';
        overlay.classList.add('is-active');  
    }

    _hideDetailOverlay() {
        let overlay = this.shadowRoot.querySelector('.overlay');
        overlay.style.opacity = '0';
        overlay.classList.remove('is-active');
    }

    _getMovieDetail(imdb) {
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&i=${imdb}`)
        .then(response => response.json())
        .then(data => {
            this._showDetailOverlay(data);
        })
        .catch(error => {
            return console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }

    _setCardInfo() {
        this._moviePoster = this.getAttribute('poster');
        this._movieTitle = this.getAttribute('title');
        this._movieType = this.getAttribute('type');
        this._movieImdb = this.getAttribute('imdbID');

        if(this._moviePoster === 'N/A') {
            this.shadowRoot.querySelector('.card__image').setAttribute('src', 'default.png');
        } else {
            this.shadowRoot.querySelector('.card__image').setAttribute('src', this._moviePoster);
        }

        this.shadowRoot.querySelector('.card__supporting-text').textContent = this._movieTitle;
        this.shadowRoot.querySelector('.card__supporting-text').setAttribute('imdbID', this._movieImdb);
        this.shadowRoot.querySelector('.card__actions').textContent = this._movieType;
    }

    _bindShowEvents(element) {
        const events = merge(
            fromEvent(element, 'mouseover')
                .pipe(map(e => e.target.getAttribute('imdbid')))
                .pipe(debounceTime(750)),
            fromEvent(element, 'mousedown').pipe(map(e => e.target.getAttribute('imdbid'))).pipe(debounceTime(750)),
            fromEvent(element, 'touchstart').pipe(map(e => e.target.getAttribute('imdbid'))).pipe(debounceTime(750))
        );

        this._cardTitleMouseover = events.subscribe(imdbID => {
            if(imdbID) {
                this._getMovieDetail(imdbID);
            }
        });
    }

    _bindHideEvents(element) {

        const events = merge(
            fromEvent(element, 'mouseout').pipe(map(e => e.target)).pipe(debounceTime(550)),
            fromEvent(element, 'touchend').pipe(map(e => e.target)).pipe(debounceTime(550))
        );
        
        this._cardTitleMouseout = events.subscribe(e => {
            this._hideDetailOverlay();
        });
    }

    disconnectedCallback() {
        this._cardTitleMouseover.unsubscribe();
        this._cardTitleMouseout.unsubscribe();
    }
}

customElements.define('movie-card', MovieCard);

