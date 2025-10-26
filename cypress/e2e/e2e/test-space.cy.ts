/* ==== Test Created with Cypress Studio ==== */
it('invaled', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('R');
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Rahaf');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear('r');
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('rahaf123');
  cy.get('.oxd-button').click();
  cy.get('.oxd-alert').click();
  cy.get('.oxd-alert-content > .oxd-text').click();
  cy.get('.oxd-alert').click();
  /* ==== End Cypress Studio ==== */
});