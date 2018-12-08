'use strict';

let Helper = codecept_helper;

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
}

module.exports = PuppeteerHelper;
