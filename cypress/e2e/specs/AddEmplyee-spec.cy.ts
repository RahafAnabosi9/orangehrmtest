import LoginPage from "cypress/support/pages/LoginPage";
import { faker } from "@faker-js/faker";

const login = new LoginPage();

describe('OrangeHRM - Employee flow using fixtures and faker', () => {
  let users;

  const employee = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(5),
    username: faker.internet.username(),
    password: "Password123!"
  };

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('Login, search employee, delete if exists, then add new employee', () => {
    login.login(users.valid.username, users.valid.password);

    cy.url().should('include', '/dashboard');

    cy.contains('PIM').should('be.visible').click();

    cy.contains('Employee List').click();

    // البحث باستخدام employeeId
    cy.get('input.oxd-input.oxd-input--active').eq(1).clear().type(employee.employeeId);
    cy.get('button[type="submit"]').filter(':visible').first().click();

    cy.get('div.oxd-table-body').then($body => {
      const rows = $body.find('.oxd-table-row');
      if (rows.length > 0) {
        cy.wrap(rows.eq(0)).find('.oxd-icon.bi-trash').click({ force: true });
        cy.get('button.oxd-button--label-danger').contains('Yes, Delete').click();
        cy.contains('Successfully Deleted').should('be.visible');
      }
    });

    cy.contains('button', 'Add').click();

    cy.get('input[placeholder="First Name"]').type(employee.firstName);
    cy.get('input[placeholder="Last Name"]').type(employee.lastName);
    cy.get('input.oxd-input.oxd-input--active').eq(3).clear().type(employee.employeeId);

    cy.get('input[type="checkbox"]').first().check({ force: true });

    cy.get('.oxd-input[autocomplete="off"]').eq(0).type(employee.username);
    cy.get('.oxd-input[autocomplete="off"]').eq(1).type(employee.password);
    cy.get('.oxd-input[autocomplete="off"]').eq(2).type(employee.password);

    cy.contains('button', 'Save').click();

    cy.contains(`${employee.firstName} ${employee.lastName}`, { timeout: 10000 }).should('be.visible');
  });

});
