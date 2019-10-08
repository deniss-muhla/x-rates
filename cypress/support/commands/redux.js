// get app redux store
Cypress.Commands.add('store', path => {
    return cy
        .window()
        .its('store')
        .invoke('getState')
        .its(path);
});

// dispatch redux action
Cypress.Commands.add('dispatch', (type, payload = undefined) => {
    return cy
        .window()
        .its('store')
        .invoke('dispatch', { type, payload });
});
