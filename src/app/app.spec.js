const GET_RATES_BUTTON_QUERY = '[data-test=GetRates-button]';

context('Get Exchange Rates', () => {
    beforeEach(() => {
        cy.whitelist();
    });

    it('Clicks get exchange rates button', () => {
        cy.visit('/');

        cy.get(GET_RATES_BUTTON_QUERY).should('exist');

        cy.get(GET_RATES_BUTTON_QUERY).click();
    });
});
