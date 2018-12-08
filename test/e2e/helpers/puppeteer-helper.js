'use strict';

const Helper = codecept_helper;

class PuppeteerHelper extends Helper {

    async getShadowElement(host, selector) {
        let page = this.helpers.Puppeteer.page;
        const element = await page.evaluateHandle(`document.querySelector('${host}').shadowRoot.querySelector('${selector}')`);
        return element;
    }

    async search(movieTitle) {
        let page = this.helpers.Puppeteer.page;

        await page
            .evaluateHandle((mTitle) =>  {
                const item =  document.querySelector('movie-search').shadowRoot.querySelector('.search__input');
                const event = new KeyboardEvent('keyup', {
                    key: 'Enter',
                });
                item.value = mTitle;
                item.focus();
                item.dispatchEvent(event);
                return item;
            }, movieTitle);
    }

    async hoverOnMovieTitle(title) {
        let page = this.helpers.Puppeteer.page;

        await page
            .evaluateHandle((mTitle) =>  {
                const item =  document.querySelector(`movie-card[title="${mTitle}"]`).shadowRoot.querySelector('.card__supporting-text');
                const event = new MouseEvent('mouseenter');
                item.dispatchEvent(event);
                return item;
            }, title);
    }

    async verifyOverlayInformation(movieTitle) {
        let page = this.helpers.Puppeteer.page;

        await page
            .evaluateHandle((mTitle, content) =>  {
                const item =  document.querySelector(`movie-card[title="${mTitle}"]`).shadowRoot;
                if( item.querySelector('.titleP').innerHTML=== '<strong>Title:</strong>Strange Days') {
                    console.log('Valid title');
                } else {
                    console.log('Invalid title');
                }

                if( item.querySelector('.yearP').innerHTML=== '<strong>Year:</strong>1995') {
                    console.log('Valid year');
                } else {
                    console.log('Invalid year');
                }

                if( item.querySelector('.directorP').innerHTML=== '<strong>Director:</strong>Kathryn Bigelow') {
                    console.log('Valid director');
                } else {
                    console.log('Invalid director');
                }

                if( item.querySelector('.imdbP').innerHTML=== '<strong>IMDB:</strong>7.2') {
                    console.log('Valid IMDB');
                } else {
                    console.log('Invalid IMDB');
                }

                const event = new MouseEvent('mouseleave');
                item.querySelector('.card__supporting-text').dispatchEvent(event);
            }, movieTitle);
    }
}

module.exports = PuppeteerHelper;
