/// <reference types="cypress" />
import 'cypress-plugin-api'
import '@testing-library/cypress/add-commands';
import cypress = require('cypress');

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (userName: string, passWord: string) => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type(userName);
  cy.get('input[name="password"]').type(passWord);
  cy.get('button[type="submit"]').click();
  cy.contains('Dashboard').should('be.visible')
  });

  Cypress.Commands.add('login1', (userName: string, passWord: string) => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.findAllByPlaceholderText("Username").type(userName);
  cy.findAllByPlaceholderText("Password").type(passWord);
  cy.findAllByPlaceholderText('Login[type="submit"]').click();
  cy.contains('Dashboard').should('be.visible')
  });

  Cypress.Commands.add('findlink',(searchText: string, Link: string) => {
  cy.findAllByText(searchText).should("have.attr","href",Link);
  });
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
 declare global {
 namespace Cypress {
   interface Chainable {
      login(username: string, password: string): Chainable<void>
      login1(username: string, password: string): Chainable<void>
      findlink(searchText: string, addLink: string): Chainable<void>;
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}