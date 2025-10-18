import LoginPage from "cypress/support/pages/LoginPage";
import EmployeePage from "cypress/support/pages/EmployeePage";
import { faker } from "@faker-js/faker";

const login = new LoginPage();
const employeePage = new EmployeePage();

describe('OrangeHRM - Add Employees + Assign & Apply Leave (Faker, No Login Details)', () => {

  let users;
  const numberOfEmployees = 5;

  // إنشاء قائمة موظفين باستخدام Faker
  const employees = Array.from({ length: numberOfEmployees }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(5),
    leaveType: 'CAN - Vacation',
    leaveDays: faker.number.int({ min: 1, max: 12 }) // سنتأكد لاحقاً من Max 10
  }));

  const getLeaveDays = (days: number) => (days > 10 ? 10 : days);

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  it('Add Employees, Assign Leave, Apply Leave', () => {

    // تسجيل الدخول
    cy.login(users.valid.username, users.valid.password);

    employees.forEach((employee, index) => {
      cy.log(`--- Processing Employee ${index + 1}: ${employee.firstName} ${employee.lastName} ---`);

      // ---------- Add Employee ----------
      employeePage.navigateToEmployeeList();
      employeePage.searchAndDeleteIfExists(employee.employeeId);

      cy.contains('PIM').click();
      cy.contains('Add Employee').click();

      cy.get('input[placeholder="First Name"]').clear().type(employee.firstName);
      cy.get('input[placeholder="Last Name"]').clear().type(employee.lastName);
      cy.get('input.oxd-input.oxd-input--active').eq(3).clear().type(employee.employeeId);

      // عدم تحديد Create Login Details
      cy.get('button[type="submit"]').click();
      cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');

      // ---------- Assign Leave ----------
      cy.contains('Leave').click();
      cy.contains('Entitlements').click();
      cy.contains('Add Entitlements').click();

      cy.get('input[placeholder="Type for hints..."]').type(employee.firstName);
      cy.contains('.oxd-autocomplete-option', employee.firstName).should('be.visible').click();

      cy.get('.oxd-select-text-input').first().click({ force: true });
      cy.get('.oxd-select-text-input').first().type(`${employee.leaveType}{enter}`);

      cy.get('.oxd-select-text-input').eq(1).click({ force: true });
      cy.get('.oxd-select-option', { timeout: 15000 })
        .should('have.length.greaterThan', 0)
        .then(($options) => {
          cy.wrap($options[$options.length - 1]).click({ force: true });
        });

      const daysToEnter = getLeaveDays(employee.leaveDays);

      cy.get('input.oxd-input.oxd-input--active[type="number"]', { timeout: 20000 })
        .should('exist')
        .should('be.visible')
        .clear()
        .type(daysToEnter.toString());

      cy.contains('button', 'Save').click();
      cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');

      // ---------- Apply Leave ----------
      cy.contains('Leave').click();
      cy.contains('Apply').click();

      cy.get('.oxd-select-text-input').first().click({ force: true });
      cy.get('.oxd-select-text-input').first().type(`${employee.leaveType}{enter}`);

      cy.get('input[placeholder="yyyy-mm-dd"]').first().click();
      cy.get('div[role="option"]').eq(1).click();
      cy.get('input[placeholder="yyyy-mm-dd"]').last().click();
      cy.get('div[role="option"]').eq(2).click();

      cy.get('textarea').type('Automated leave request');
      cy.contains('button', 'Submit').click();
      cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');
    });

  });

});
