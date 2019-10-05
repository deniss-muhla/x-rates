const EX_RATES_API = 'https://api.exchangeratesapi.io/latest';
const GET_RATES_BUTTON_QUERY = '[data-test=GetRates-button]';

context('Exchange Rates', () => {
    beforeEach(() => {
        cy.whitelist();
    });

    it('Clicks get exchange rates button', () => {
        cy.route({
            method: 'GET',
            url: EX_RATES_API
        }).as('apiExRates');

        cy.visit('/');

        cy.get(GET_RATES_BUTTON_QUERY).should('exist');
        cy.get(GET_RATES_BUTTON_QUERY).click();

        cy.wait('@apiExRates').then(xhr => {
            assert.isNotNull(xhr.response.body.data, '1st API call has data');
        });
    });
});
