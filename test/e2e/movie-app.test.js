Feature('Movie App');

Scenario('Movie App Suite', async (I) => {
    I.say('Verifying the page elements');
    I.amOnPage('/');
    I.seeInTitle('Movie App')
    I.see('Movie App');

    I.say('Verifying Inital data has been retrieved');
    I.seeElement('movie-card[title="Doctor Strange"]');
    I.seeElement('movie-card[title="Strange Days"]');
    I.seeElement('movie-card[title="Strange Wilderness"]');
    I.seeElement('movie-search');

    I.say('Verifying Search functionality');
    I.seeElement('.header', 'movie-search')
    I.search('Hello');
    I.seeElement('movie-card[title="Hello, Dolly!"]');
    I.seeElement('movie-card[title="Hello, My Name Is Doris"]');
});