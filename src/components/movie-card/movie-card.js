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
          min-height: 500px;
          overflow: visible;
          min-width: 300px;
          position: relative;
          margin: 1rem;
          background: rgb(255,255,255);
          border-radius: 2px;
          box-sizing: border-box; }
        
        .card__media {
          background-color: rgb(255,64,129);
          background-repeat: repeat;
          background-position: 50% 50%;
          background-size: cover;
          background-origin: padding-box;
          background-attachment: scroll;
          box-sizing: border-box; }
        
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
          padding: 16px 16px;
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
        
        .card__menu {
                position: absolute;
                right: 16px;
                top: 16px; }
        
        .tooltip {
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
          -webkit-transform: scale(0);
                  transform: scale(0);
          -webkit-transform-origin: top center;
                  transform-origin: top center; 
          background: rgba(97,97,97, 0.9);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;
          min-width: 200px;
          min-height: 100px;
          position: absolute;
          top: 50%;
          left: 50%;
          padding: 8px;
          z-index: 2;
          border-radius: 1rem;
          text-align: left; }
        
        .tooltip.is-active {
          -webkit-animation: pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards;
                  animation: pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards; }
        
        .tooltip--large {
          line-height: 14px;
          font-size: 14px;
          padding: 16px; }

        .tooltip > p > strong  {
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
        `;

        // Create Card Elements
        let card = document.createElement('div');
        card.setAttribute('class', 'card card-shadow--2dp');

        let cardTitle = document.createElement('div');
        cardTitle.setAttribute('class', 'card__title card--expand');

        let cardText = document.createElement('div');
        cardText.setAttribute('class', 'card__supporting-text');

        let cardActions = document.createElement('div');
        cardActions.setAttribute('class', 'card__actions card--border');

        let tooltip = document.createElement('div');
        let titleP = document.createElement('p');
        let yearP = document.createElement('p');
        let directorP = document.createElement('p');
        let imdbP = document.createElement('p');
        titleP.setAttribute('class', 'titleP');
        yearP.setAttribute('class', 'yearP');
        directorP.setAttribute('class', 'directorP');
        imdbP.setAttribute('class', 'imdbP');

        tooltip.setAttribute('class', 'tooltip');
        tooltip.style.display = 'none';

        tooltip.appendChild(titleP);
        tooltip.appendChild(yearP);
        tooltip.appendChild(directorP);
        tooltip.appendChild(imdbP);
    
        card.appendChild(cardTitle);
        card.appendChild(cardText);
        card.appendChild(cardActions);
        card.appendChild(tooltip);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(card);
    }

    connectedCallback() {
        this._cardTitle = this.shadowRoot.querySelector('.card__supporting-text');

        this._setCardInfo();
        this._bindShowEvents(this._cardTitle);
        this._bindHideEvents(this._cardTitle);
    }

    _showDetailTooltip(detail) {
        let tooltip = this.shadowRoot.querySelector('.tooltip');
        this.shadowRoot.querySelector('.titleP').innerHTML = `<strong>Title:</strong>${detail.Title}`;
        this.shadowRoot.querySelector('.yearP').innerHTML = `<strong>Year:</strong>${detail.Year}`;
        this.shadowRoot.querySelector('.directorP').innerHTML = `<strong>Director:</strong>${detail.Director}`;
        this.shadowRoot.querySelector('.imdbP').innerHTML = `<strong>IMDB:</strong>${detail.imdbRating}`;
    
        tooltip.style.display = 'block';
        tooltip.classList.add('is-active');  
    }

    _hideDetailTooltip() {
        let tooltip = this.shadowRoot.querySelector('.tooltip');
        tooltip.style.display = 'none';
        tooltip.classList.remove('is-active');
    }

    _getMovieDetail(imdb) {
        return fetch(`http://www.omdbapi.com/?apikey=aba065d3&i=${imdb}`)
        .then(response => response.json())
        .then(data => {
            this._showDetailTooltip(data);
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
            this.shadowRoot.querySelector('.card__title').style.backgroundImage = `url(default.png)`;
        } else {
            this.shadowRoot.querySelector('.card__title').style.backgroundImage = `url(${ this._moviePoster })`;
        }

        this.shadowRoot.querySelector('.card__supporting-text').textContent = this._movieTitle;
        this.shadowRoot.querySelector('.card__supporting-text').setAttribute('imdbID', this._movieImdb);
        this.shadowRoot.querySelector('.card__actions').textContent = this._movieType;
    }

    _bindShowEvents(element) {
        const events = merge(
            fromEvent(element, 'mouseenter')
                .pipe(map(e => e.target.getAttribute('imdbid')))
                .pipe(takeUntil(timer(6000)))
                .pipe(debounceTime(750)),
            fromEvent(element, 'mouseover')
                .pipe(map(e => e.target.getAttribute('imdbid')))
                .pipe(takeUntil(timer(6000)))
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
        
        this._cardTitleMouseout = events.subscribe(imdbID => {
            this._hideDetailTooltip();
        });
    }

    disconnectedCallback() {
        this._cardTitleMouseover.unsubscribe();
        this._cardTitleMouseout.unsubscribe();
    }
}

customElements.define('movie-card', MovieCard);

