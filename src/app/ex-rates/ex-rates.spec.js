const EX_RATES_API = 'https://api.exchangeratesapi.io/latest';
const GET_RATES_BUTTON_QUERY = '[data-test=GetRates-button]';
const GET_RATES_ROW_QUERY = key => `[data-test=row-${key}]`;
const GET_RATES_ROW_CURR_QUERY = '[data-test=curr]';
const GET_RATES_ROW_RATE_QUERY = key => '[data-test=rate]';
const REDUX_EX_RATES_SELECTOR = win =>
    win.store.getState().api.exRates.latestRates;

context('Exchange Rates', () => {
    beforeEach(() => {
        cy.whitelist();
    });

    it('Clicks get exchange rates button and render data', () => {
        // Add API request watcher
        cy.route({
            method: 'GET',
            url: EX_RATES_API
        }).as('apiExRates');

        // visit landing page
        cy.visit('/');

        // find and click get rates button
        cy.get(GET_RATES_BUTTON_QUERY).should('exist');
        cy.get(GET_RATES_BUTTON_QUERY).click();

        // wait for API response
        cy.wait('@apiExRates').then(xhr => {
            const responseData = xhr.response.body;
            assert.isNotNull(responseData, 'Get ExRates API call has data');

            // test redux store data
            cy.window()
                .then(REDUX_EX_RATES_SELECTOR)
                .should(reduxData => {
                    expect(reduxData, 'Redux store ExRates').to.deep.eq(
                        responseData
                    );
                });

            // test rendered table
            Object.keys(responseData.rates).forEach(key => {
                cy.get(GET_RATES_ROW_QUERY(key)).then(row => {
                    cy.wrap(row)
                        .children(GET_RATES_ROW_CURR_QUERY)
                        .should('contain', key);
                    cy.wrap(row)
                        .children(GET_RATES_ROW_RATE_QUERY)
                        .should('contain', responseData.rates[key]);
                });
            });
        });
    });
});
