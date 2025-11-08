import LoginPage from "../../support/pages/LoginPage";
import { faker } from '@faker-js/faker';

const login = new LoginPage();

describe('Add 5 Employees With Profile Pictures', () => {

  const employees = Array.from({ length: 5 }).map((_, index) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
    pic: `pic/pic${index + 1}.jpeg` // pic1.jpeg → pic5.jpeg
  }));

  const createdEmployeeIds: string[] = [];

  before(() => {
    cy.visit('/web/index.php/auth/login');
    login.login('Admin', 'admin123');
  });

  it('Add employees with pictures', () => {

    employees.forEach((emp) => {

      cy.visit('/web/index.php/pim/addEmployee');

      // Fill names
      cy.get('input[name="firstName"]').clear().type(emp.firstName);
      cy.get('input[name="lastName"]').clear().type(emp.lastName);

      // ✅ Employee ID (الحقل الثالث)
      cy.get('div.oxd-input-group input.oxd-input.oxd-input--active')
        .eq(2) // <-- هذا هو حقل Employee ID
        .clear()
        .type(emp.employeeId);

      // Upload Picture
      cy.get('.oxd-file-input')
        .selectFile(`cypress/fixtures/${emp.pic}`, { force: true });

      // Save
      cy.get('button[type="submit"]').click();

      // View profile + store empNumber
      cy.url().should('include', '/pim/viewPersonalDetails');
      cy.url().then((url) => {
        const empNumber = url.split('/').pop();
        createdEmployeeIds.push(empNumber!);
        cy.log(`✅ Added: ${emp.firstName} ${emp.lastName} — empNumber: ${empNumber}`);
      });

    });
  });

  it('Show created Employee IDs', () => {
    cy.log('✅ All Employees Created: ', createdEmployeeIds);
  });

});

/**import LoginPage from "../../support/pages/LoginPage";
import { faker } from '@faker-js/faker';

const login = new LoginPage();

describe('Add 5 Employees With Profile Pictures', () => {

  const employees = Array.from({ length: 5 }).map((_, index) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
    pic: `pic/pic${index + 1}.jpeg` // pic1.jpeg → pic5.jpeg
  }));

  const createdEmployeeIds: string[] = [];

  before(() => {
    cy.visit('/web/index.php/auth/login');
    login.performLogin('Admin', 'admin123');
  });

  it('Add employees with pictures', () => {

    employees.forEach((emp) => {

      cy.visit('/web/index.php/pim/addEmployee');

      // Fill names
      cy.get('input[name="firstName"]').clear().type(emp.firstName);
      cy.get('input[name="lastName"]').clear().type(emp.lastName);

      // Employee ID
      cy.get('label:contains("Employee Id")')
        .parents('.oxd-input-group')
        .find('input')
        .clear()
        .type(emp.employeeId);

      // Upload Picture
      cy.get('.oxd-file-input')
        .selectFile(`cypress/fixtures/${emp.pic}`, { force: true });

      // Save
      cy.get('button[type="submit"]').click();

      // Get Employee Number after creation
      cy.url().should('include', '/pim/viewPersonalDetails');
      cy.url().then((url) => {
        const empNumber = url.split('/').pop();
        createdEmployeeIds.push(empNumber!);
        cy.log(`✅ Added: ${emp.firstName} ${emp.lastName} — empNumber: ${empNumber}`);
      });

    });
  });

  it('Show created Employee IDs', () => {
    cy.log('✅ All Employees Created: ', createdEmployeeIds);
  });

});*/
