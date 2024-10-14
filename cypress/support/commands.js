
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#open-text-area').type('teste');
    cy.contains('button','Enviar').click(); // Corrigido aqui
});
