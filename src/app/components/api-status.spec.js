const EX_RATES_API = 'https://api.exchangeratesapi.io/latest';
const EX_RATES_TABLE_QUERY = '[data-test=ExRatesTable]';
const API_LOADING_QUERY = '[data-test=ApiLoading]';
const API_ERROR_QUERY = '[data-test=ApiError]';
const API_GET_EX_RATES_REQUEST_TYPE = 'GET_EX_RATES_REQUEST';
const API_GET_EX_RATES_SUCCESS_TYPE = 'GET_EX_RATES_SUCCESS';
const API_GET_EX_RATES_ERROR_TYPE = 'GET_EX_RATES_ERROR';
const API_GET_EX_RATES_ERROR_PAYLOAD = 'TEST_ERROR_PAYLOAD';

context('Api Status Component', () => {
    beforeEach(() => {
        cy.whitelist();

        // visit landing page
        cy.visit('/');
    });

    it('Renders loading component', () => {
        // load fixture ex-rates-latest.json
        cy.fixture('ex-rates-latest.json').as('exRatesLatestJSON');

        // watch for API requests and stub responses
        cy.route({
            method: 'GET',
            url: EX_RATES_API,
            response: '@exRatesLatestJSON'
        }).as('apiExRates');

        // Loading: hidden; Error: hidden; Wrapped: visible
        cy.get(API_LOADING_QUERY).should('not.exist');
        cy.get(API_ERROR_QUERY).should('not.exist');
        cy.get(EX_RATES_TABLE_QUERY).should('exist');

        // dispatch get rates request action
        cy.dispatch(API_GET_EX_RATES_REQUEST_TYPE);

        // Loading: visible; Error: hidden; Wrapped: hidden
        cy.get(API_LOADING_QUERY).should('exist');
        cy.get(API_ERROR_QUERY).should('not.exist');
        cy.get(EX_RATES_TABLE_QUERY).should('not.exist');

        // wait for API response
        cy.wait('@apiExRates').then(() => {
            // Loading: hidden; Error: hidden; Wrapped: visible
            cy.get(API_LOADING_QUERY).should('not.exist');
            cy.get(API_ERROR_QUERY).should('not.exist');
            cy.get(EX_RATES_TABLE_QUERY).should('exist');
        });
    });

    it('Renders error component', () => {
        // Loading: hidden; Error: hidden; Wrapped: visible
        cy.get(API_LOADING_QUERY).should('not.exist');
        cy.get(API_ERROR_QUERY).should('not.exist');
        cy.get(EX_RATES_TABLE_QUERY).should('exist');

        // dispatch get rates error action
        cy.dispatch(
            API_GET_EX_RATES_ERROR_TYPE,
            API_GET_EX_RATES_ERROR_PAYLOAD
        );
        // Loading: hidden; Error: visible; Wrapped: visible
        cy.get(API_LOADING_QUERY).should('not.exist');
        cy.get(API_ERROR_QUERY)
            .should('exist')
            .should('contain', API_GET_EX_RATES_ERROR_PAYLOAD);
        cy.get(EX_RATES_TABLE_QUERY).should('exist');

        // dispatch get rates success action
        cy.dispatch(API_GET_EX_RATES_SUCCESS_TYPE, {});

        // Loading: hidden; Error: hidden; Wrapped: visible
        cy.get(API_LOADING_QUERY).should('not.exist');
        cy.get(API_ERROR_QUERY).should('not.exist');
        cy.get(EX_RATES_TABLE_QUERY).should('exist');
    });
});
