'use strict';

import { ApiService } from '../services/apiService';

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
          border: 3px solid black;
          -webkit-flex: 1 25%;
              -ms-flex: 1 25%;
                  flex: 1 25%;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
          font-size: 16px;
          font-weight: 400;
          height: 400px;
          overflow: hidden;
          min-width: 200px;
          max-width: 200px;
          position: relative;
          margin: 1.5rem;
          background: black;
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
          padding: 5px;
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

        .card__supporting-text {
          color: #fff;
          font-size: 1rem;
          line-height: 18px;
          overflow: hidden;
          padding: 16px 16px;
          width: 90%; }
          .card__supporting-text.card--border {
            border-bottom: 1px solid rgba(256, 256, 256, 0.1); }

        .card__actions {
          font-size: 12px;
          color: #fff;
          line-height: normal;
          width: 100%;
          padding: 8px;
          box-sizing: border-box; }
          .card__actions.card--border {
            border-top: 1px solid rgba(256, 256, 256, 0.1); }

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
                z-index: 2;} }`;

        // Create Card Elements
        let card = document.createElement('div');
        card.setAttribute('class', 'card card-shadow--2dp');

        let cardTitle = document.createElement('div');
        let cardTitleImg = document.createElement('img');
        let cardTitleImgOverlay = document.createElement('div');
        let cardText = document.createElement('div');
        let cardActions = document.createElement('div');
        let cardActionsImage = document.createElement('img');
        cardTitle.setAttribute('class', 'card__title card--expand');
        cardTitleImg.setAttribute('class', 'card__image');
        cardTitleImgOverlay.setAttribute('class', 'overlay');
        cardText.setAttribute('class', 'card__supporting-text');
        cardActions.setAttribute('class', 'card__actions card--border');
        cardActionsImage.setAttribute('class', 'card__action-image');
        cardActionsImage.setAttribute('width', '20');
        cardActionsImage.setAttribute('height', '20');

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

        cardActions.appendChild(cardActionsImage);
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
        this._bindEvents(this._cardTitle);
    }

    _setCardInfo() {
        const moviePoster = this.getAttribute('poster');
        const movieTitle = this.getAttribute('title');
        const movieType = this.getAttribute('type');
        const movieImdb = this.getAttribute('imdbID');

        let typeIconEl = this.shadowRoot.querySelector('.card__action-image');
        let cardImageEl = this.shadowRoot.querySelector('.card__image');


        cardImageEl.setAttribute('alt', movieTitle);
        if(moviePoster === 'N/A') {
            cardImageEl.style.opacity = '0.3';
            cardImageEl.setAttribute('width', '200');
            cardImageEl.setAttribute('height', '290');
            cardImageEl.setAttribute('src', 'https://image.flaticon.com/icons/svg/272/272348.svg');
        } else {
            cardImageEl.setAttribute('src', moviePoster);
        }

        if(movieType === 'movie') {
            typeIconEl.setAttribute('src', 'https://image.flaticon.com/icons/png/512/1077/1077643.png');
            typeIconEl.setAttribute('title', 'Movie');
        } else {
            typeIconEl.setAttribute('src', 'https://image.flaticon.com/icons/svg/1234/1234532.svg');
            typeIconEl.setAttribute('title', 'TV Show');
        }

        this.shadowRoot.querySelector('.card__supporting-text').textContent = movieTitle;
        this.shadowRoot.querySelector('.card__supporting-text').setAttribute('imdbID', movieImdb);
    }

    _bindEvents(element) {
        element.addEventListener('mouseenter', this._showOverlay.bind(this));
        element.addEventListener('mouseleave', this._hideOverlay.bind(this));
        element.addEventListener('touchstart', this._showOverlay.bind(this));
        element.addEventListener('touchend', this._hideOverlay.bind(this));
    }

    _showOverlay(event) {
        const imdbID = event.target.getAttribute('imdbid');
        const that = this;
        this._timer = setTimeout(() => {
            ApiService.searchByImdbId(imdbID)
                .then(detail => this._drawOverlay(detail));
        }, 1000);
    }

    _hideOverlay(event) {
        clearTimeout(this._timer);
        let overlay = this.shadowRoot.querySelector('.overlay');
        overlay.style.opacity = '0';
        overlay.classList.remove('is-active');
    }

    _drawOverlay(detail) {
        let overlay = this.shadowRoot.querySelector('.overlay');
        this.shadowRoot.querySelector('.titleP').innerHTML = `<strong>Title:</strong>${detail.Title}`;
        this.shadowRoot.querySelector('.yearP').innerHTML = `<strong>Year:</strong>${detail.Year}`;
        this.shadowRoot.querySelector('.directorP').innerHTML = `<strong>Director:</strong>${detail.Director}`;
        this.shadowRoot.querySelector('.imdbP').innerHTML = `<strong>IMDB:</strong>${detail.imdbRating}`;

        overlay.style.opacity = '1';
        overlay.classList.add('is-active');
    }

    disconnectedCallback() {
        this._cardTitle.removeEventListener('mouseenter', this._showOverlay);
        this._cardTitle.removeEventListener('mouseleave', this._hideOverlay);
        this._cardTitle.removeEventListener('touchstart', this._showOverlay);
        this._cardTitle.removeEventListener('touchend', this._hideOverlay);
    }
}

customElements.define('movie-card', MovieCard);

