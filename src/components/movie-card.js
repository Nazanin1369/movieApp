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
        :host {
            margin: 0 auto;
            max-height: 300px;}
        .card {
            background: #141414;
            border: 3px solid black;
            border-radius: 2px;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex: 1 calc(25% - 10px);
                -ms-flex: 1 calc(25% - 10px);
                    flex: 1 calc(25% - 10px);
            -webkit-flex-direction: column;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-justify-content: space-evenly;
                    justify-content: space-evenly;
            font-size: 2vw;
            font-weight: 400;
            height: 300px;
            overflow: hidden;
            min-width: calc(100vw * (1/6));
            max-width: calc(100vw * (1/6));
            position: relative;}
            .card:hover {
                border: 3px solid #e50914;}
            .card__image {
                max-height: 358px;
              //min-width: calc(100vw * (1/6));}
            .card__title {
                -webkit-align-items: center;
                    -ms-flex-align: center;
                        align-items: center;
                box-sizing: border-box;
                color: #fff;
                padding: 5px;
                display: block;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-justify-content: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                line-height: normal;
                padding: 0;
                max-height: 70%;
                -webkit-perspective-origin: 165px 56px;
                        perspective-origin: 165px 56px;
                -webkit-transform-origin: 165px 56px;
                        transform-origin: 165px 56px;}
                .card__title.card--border {
                border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
            .card__supporting-text {
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                cursor: pointer;
                font-size: 1.5rem;
                letter-spacing: -1px;
                line-height: 18px;
                max-height: 30%;
                overflow: hidden;
                padding-left: .5rem;
                width: 100%; }
                .card__supporting-text.card--border {
                    border-bottom: 1px solid rgba(256, 256, 256, 0.1); }
            .card--expand {
                -webkit-flex-grow: 1;
                    -ms-flex-positive: 1;
                        flex-grow: 1; }
        .overlay {
            color: #f1f1f1;
            background: rgb(0, 0, 0);
            background: rgba(0, 0, 0, 0.7);
            font-size: 1.2rem;
            letter-spacing: .1rem;
            line-height: 2rem;
            max-height: 200px;
            min-height: 200px;
            opacity:0;
            padding-left: .5rem;
            position: absolute;
            text-align: left;
            transition: .5s ease;
            top: 0;
            width: 100%;
            z-index: 2;}
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

        @media screen and (max-width: 600px) {
            .card {
                min-width: calc(100vw * (1/4));
                max-width: calc(100vw * (1/4));}
                .card__supporting-text {
                    font-size: 2vw;}
            .overlay {
                font-size: 2vw;
                min-height: 200px;
                line-height: .8rem;
                padding: 5px;
                z-index: 2;} }`;

        // Create Card Elements
        let card = document.createElement('div');
        card.setAttribute('class', 'card card-shadow--2dp');

        let cardTitle = document.createElement('div');
        let cardTitleImg = document.createElement('img');
        let cardTitleImgOverlay = document.createElement('div');
        let cardText = document.createElement('div');
        let p1 = document.createElement('p');
        let p2 = document.createElement('small');
        cardTitle.setAttribute('class', 'card__title card--expand');
        cardTitleImg.setAttribute('class', 'card__image');
        cardTitleImgOverlay.setAttribute('class', 'overlay');
        cardText.setAttribute('class', 'card__supporting-text');

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

        cardText.appendChild(p1);
        cardText.appendChild(p2);
        cardTitle.appendChild(cardTitleImg);
        cardTitle.appendChild(cardTitleImgOverlay);
        card.appendChild(cardTitle);
        card.appendChild(cardText);

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
        const movieTitle = this.getAttribute('movie-title');
        const movieType = this.getAttribute('type');
        const movieImdb = this.getAttribute('imdbID');

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

        this.shadowRoot.querySelector('.card__supporting-text > p:first-child').textContent = movieTitle;
        this.shadowRoot.querySelector('.card__supporting-text > small:last-child').textContent = movieType;
        this.shadowRoot.querySelector('.card__supporting-text').setAttribute('imdbID', movieImdb);
    }

    _bindEvents(element) {
        element.addEventListener('mouseenter', this._showOverlay.bind(this), {passive: true});
        element.addEventListener('mouseleave', this._hideOverlay.bind(this), {passive: true});
        element.addEventListener('touchstart', this._showOverlay.bind(this), {passive: true});
        element.addEventListener('touchend', this._hideOverlay.bind(this), {passive: true});
    }

    _showOverlay(event) {
        const imdbID = event.target.getAttribute('imdbid');
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

