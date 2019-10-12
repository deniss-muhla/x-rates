const EX_RATES_API = 'https://api.exchangeratesapi.io/latest';
const API_GET_EX_RATES_REQUEST_TYPE = 'GET_EX_RATES_REQUEST';
const API_GET_EX_RATES_SUCCESS_TYPE = 'GET_EX_RATES_SUCCESS';
const API_GET_EX_RATES_ERROR_TYPE = 'GET_EX_RATES_ERROR';
const API_GET_EX_RATES_ERROR_PAYLOAD = 'TEST_ERROR_PAYLOAD';
const API_EX_RATES_SELECTOR = 'api.exRates';
const DATE_FORMAT = 'YYYY-MM-DD';

context('Redux Store: API.ExRates', () => {
    beforeEach(() => {
        cy.whitelist();

        // visit landing page to initiate redux
        cy.visit('/');
    });

    // test get ExRates functionality
    it('Get ExRates', () => {
        // check initial store state
        cy.store(API_EX_RATES_SELECTOR).should(exRates => {
            expect(exRates.isPending, 'ExRates pending state').to.be.false;
            expect(exRates.error, 'ExRates error state').to.be.empty;
        });

        // stub API responses for error
        cy.route({
            method: 'GET',
            url: EX_RATES_API,
            status: 404,
            response: ''
        }).as('apiExRates');

        // dispatch get rates request action
        cy.dispatch(API_GET_EX_RATES_REQUEST_TYPE);
        cy.store(API_EX_RATES_SELECTOR).should(exRates => {
            expect(exRates.isPending, 'ExRates pending state').to.be.true;
            expect(exRates.error, 'ExRates error state').to.be.empty;
        });

        // wait for error response
        cy.wait('@apiExRates');
        cy.store(API_EX_RATES_SELECTOR).should(exRates => {
            expect(exRates.isPending, 'ExRates pending state').to.be.false;
            expect(exRates.error, 'ExRates error state').to.be.not.empty;
        });

        // alter API request watcher
        // don't stub responses to check possible server API changes
        cy.route({
            method: 'GET',
            url: EX_RATES_API
        }).as('apiExRates');

        // dispatch get rates request action
        cy.dispatch(API_GET_EX_RATES_REQUEST_TYPE);
        cy.store(API_EX_RATES_SELECTOR).should(exRates => {
            expect(exRates.isPending, 'ExRates pending state').to.be.true;
            expect(exRates.error, 'ExRates error state').to.be.empty;
        });

        // wait for API response
        cy.wait('@apiExRates').then(xhr => {
            // check external API
            expect(xhr.response.body, 'Get ExRates API response').to.be.not
                .empty;
            expect(xhr.response.body.base, 'Get ExRates API response.base').to
                .be.not.empty;
            // check ExRates date is within two days
            expect(
                xhr.response.body.date,
                'Get ExRates API response.date'
            ).to.satisfy(date => {
                return Cypress.moment(date).isBetween(
                    Cypress.moment().subtract(2, 'days'),
                    Cypress.moment()
                );
            });
            expect(xhr.response.body.rates, 'Get ExRates API response.rates ')
                .to.be.not.empty;
            cy.store(API_EX_RATES_SELECTOR).should(exRates => {
                expect(exRates.isPending, 'ExRates pending state').to.be.false;
                expect(exRates.error, 'ExRates error state').to.be.empty;
                expect(
                    exRates.latestRates,
                    'ExRates latestRates state'
                ).to.deep.eq(xhr.response.body);
            });
        });
    });
});
