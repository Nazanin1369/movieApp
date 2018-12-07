Feature('My First Test');

Scenario('test something', (I) => {
    I.amOnPage('/');
    I.seeInTitle('Movie App')
    I.see('Movie App');

    I.seeElement('movie-card[title="Doctor Strange"]');
    I.seeElement('movie-card[title="Strange Days"]');
    I.seeElement('movie-card[title="Strange Wilderness"]');
    I.seeElement('movie-search');
    pause()
});