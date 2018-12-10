Feature('Movie App');

Scenario('Movie App Suite', async (I) => {
    I.say('Verifying the page elements');
    I.amOnPage('/');
    I.seeInTitle('Movie App')
    I.see('Movie App');

    I.say('Verifying Inital data has been retrieved');
    I.seeElement('movie-card[movie-title="Doctor Strange"]');
    I.seeElement('movie-card[movie-title="Strange Days"]');
    I.seeElement('movie-card[movie-title="Strange Wilderness"]');
    I.seeElement('movie-search');

    I.say('Verifying Search functionality');
    I.seeElement('.header', 'movie-search')
    I.search('Hello');
    I.wait(4);
    I.seeElement('movie-card[movie-title="Hello, Dolly!"]');
    I.seeElement('movie-card[movie-title="Hello, My Name Is Doris"]');

    I.say('searching another term...');
    I.search('Cat');
    I.wait(4);
    I.seeElement('movie-card[movie-title="Black Cat, White Cat"]');
    I.seeElement('movie-card[movie-title="The Cat in the Hat"]');
    I.seeElement('movie-card[movie-title="Cat on a Hot Tin Roof"]');

    I.say('Verify ckeck on the header loads the default set of data');
    I.click('Movie App');
    I.wait('3');
    I.seeElement('movie-card[movie-title="Doctor Strange"]');
    I.seeElement('movie-card[movie-title="Strange Days"]');
    I.seeElement('movie-card[movie-title="Strange Wilderness"]');

    I.say('searching another term...');
    I.search('Netflix');
    I.wait(4);
    I.seeElement('movie-card[movie-title="Handsome: A Netflix Mystery Movie"]');
    I.seeElement('movie-card[movie-title="Netflix Live"]');
    I.seeElement('movie-card[movie-title="Netflix Acquires Seth Rogen"]');
    I.seeElement('movie-card[movie-title="Jaws on Netflix"]');
    I.seeElement('movie-card[movie-title="Netflix"]');
    I.seeElement('movie-card[movie-title="Netflix & Chill"]');

    I.say('Verify ckeck on the header popcorn icon loads the default set of data');
    I.click('.header__image ');
    I.wait(3);
    I.seeElement('movie-card[movie-title="Doctor Strange"]');
    I.seeElement('movie-card[movie-title="Strange Days"]');
    I.seeElement('movie-card[movie-title="Strange Wilderness"]');

    I.say('Verifying movie-card overlay functionality');
    I.hoverOnMovieTitle('Strange Days');
    I.wait(2);
    I.getShadowElement('movie-card[movie-title="Strange Days"]', '.overlay.is-active');
    I.getShadowElement('movie-card[movie-title="Strange Days"]', '.titleP');
    I.getShadowElement('movie-card[movie-title="Strange Days"]', '.yearP');
    I.getShadowElement('movie-card[movie-title="Strange Days"]', '.directorP');
    I.getShadowElement('movie-card[movie-title="Strange Days"]', '.imdbP');
    I.verifyOverlayInformation('Strange Days');
});