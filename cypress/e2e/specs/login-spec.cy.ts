import LoginPage from "cypress/support/pages/LoginPage";

const loginobj = new LoginPage();

describe('OrangeHRM Login Tests', () => {

  it('should login successfully with valid credentials', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    loginobj.login();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('Add new employee', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    loginobj.login();

    cy.url().should('include', '/dashboard');
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();
  });

 });