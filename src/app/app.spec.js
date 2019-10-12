const EX_RATES_COMPONENT_QUERY = '[data-test=ExRates]';

context('Exchange Rates Application', () => {
    beforeEach(() => {
        cy.whitelist();
    });

    it('Rendered ExRates component', () => {
        cy.visit('/');

        cy.get(EX_RATES_COMPONENT_QUERY).should('exist');
    });
});
