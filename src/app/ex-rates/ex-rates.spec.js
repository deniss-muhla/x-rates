const EX_RATES_API = 'https://api.exchangeratesapi.io/latest';
const EX_RATES_QUERY = '[data-test=ExRates]';
const EX_RATES_TABLE_QUERY = '[data-test=ExRatesTable]';
const GET_RATES_BUTTON_QUERY = '[data-test=GetRates-button]';
const GET_RATES_ROW_QUERY = key => `[data-test=row-${key}]`;
const GET_RATES_ROW_CURR_QUERY = '[data-test=curr]';
const GET_RATES_ROW_RATE_QUERY = '[data-test=rate]';
const REDUX_EX_RATES_SELECTOR = 'api.exRates.latestRates';

context('Exchange Rates', () => {
    beforeEach(() => {
        cy.whitelist();
    });

    it('Clicks get exchange rates button and render data', () => {
        // load fixture ex-rates-latest.json
        cy.fixture('ex-rates-latest.json').as('exRatesLatestJSON');

        // watch for API requests and stub responses
        cy.route({
            method: 'GET',
            url: EX_RATES_API,
            response: '@exRatesLatestJSON'
        }).as('apiExRates');

        // visit landing page
        cy.visit('/');

        // find ExRates component
        cy.get(EX_RATES_QUERY).should('exist');

        // find ExRates table component
        cy.get(EX_RATES_TABLE_QUERY).should('exist');

        // find and click get rates button
        cy.get(GET_RATES_BUTTON_QUERY).should('exist');
        cy.get(GET_RATES_BUTTON_QUERY).click();

        // wait for API response
        cy.wait('@apiExRates').then(xhr => {
            const responseData = xhr.response.body;

            // test rendered table
            Object.keys(responseData.rates).forEach(key => {
                cy.get(GET_RATES_ROW_QUERY(key)).then(row => {
                    cy.wrap(row)
                        .find(GET_RATES_ROW_CURR_QUERY)
                        .should('contain', key);
                    cy.wrap(row)
                        .find(GET_RATES_ROW_RATE_QUERY)
                        .should('contain', responseData.rates[key]);
                });
            });
        });
    });
});
