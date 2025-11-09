import LoginPage from "cypress/support/pages/LoginPage";

const login = new LoginPage();

describe('OrangeHRM Full Test Suite', () => {
  let users;

  before(() => {
    // تحميل بيانات المستخدمين من ملف الـ fixture
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('should login with valid credentials', () => {
    login.login(users.valid.username, users.valid.password);
    cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible');
  });

  it('should fail with invalid password', () => {
    login.login(users.invalidPassword.username, users.invalidPassword.password);
    cy.get('.oxd-alert-content-text').should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('should fail with invalid username', () => {
    login.login(users.invalidUsername.username, users.invalidUsername.password);
    cy.get('.oxd-alert-content-text').should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('should delete second employee if exists, then add a new employee with login details', () => {
    // تسجيل الدخول باستخدام بيانات صالحة
    login.login(users.valid.username, users.valid.password);

    cy.url().should('include', '/dashboard');

    cy.contains('PIM').click();
    cy.contains('Employee List').click();

    cy.get('input[placeholder="Type for hints..."]').first().type('rayassss');
    cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space[type="submit"]').click();

    cy.get('div.oxd-table-body').then($body => {
      if ($body.find('.oxd-table-row').length >= 2) {
        cy.get('.oxd-table-row').eq(1).within(() => {
          cy.get('.oxd-icon.bi-trash').should('be.visible').click();
        });

        cy.get('button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin')
          .contains('Yes, Delete')
          .click();

        cy.wait(2000);
      }
    });

    cy.contains('Add').click();

    cy.get('input[placeholder="First Name"]').type('Rahaf');
    cy.get('input[placeholder="Last Name"]').type('Omar');
    cy.get('input.oxd-input.oxd-input--active').eq(3).type('12245');

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.get('.oxd-input').filter('[autocomplete="off"]').eq(0).type('RahafO');
    cy.get('.oxd-input').filter('[autocomplete="off"]').eq(1).type('StrongPass123!');
    cy.get('.oxd-input').filter('[autocomplete="off"]').eq(2).type('StrongPass123!');

    cy.contains('Save').click();

    cy.contains('Rahaf Omar', { timeout: 10000 }).should('be.visible');
  });
 it.only('should find url', () => {
    
    cy.findlink('OrangeHRM, Inc',"http://www.orangehrm.com");
 });
});
