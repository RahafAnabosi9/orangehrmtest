import LoginPage from "cypress/support/pages/LoginPage";
import EmployeePage from "cypress/support/pages/EmployeePage";
import { LeavePage } from "cypress/support/pages/LeavePage"; // إذا استخدمت export class LeavePage
// أو إذا حولتيها لـ default export:
// import LeavePage from "cypress/support/pages/LeavePage";

import { faker } from "@faker-js/faker";

const login = new LoginPage();
const employeePage = new EmployeePage();
const leavePage = new LeavePage(); // ✅ الجديد

describe('OrangeHRM - Add Employees + Assign & Apply Leave (Page Objects)', () => {

  let users;
  const numberOfEmployees = 5;

  const employees = Array.from({ length: numberOfEmployees }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(5),
    leaveType: 'CAN - Vacation',
    leaveDays: faker.number.int({ min: 1, max: 12 })
  }));

  const getLeaveDays = (days) => (days > 10 ? 10 : days);

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  it('Add Employees, Assign & Apply Leave (Faker + Page Objects)', () => {

    // تسجيل الدخول
    cy.login(users.valid.username, users.valid.password);

    employees.forEach((employee, index) => {

      cy.log(`--- 👤 Employee ${index + 1}: ${employee.firstName} ${employee.lastName} ---`);

      // ---------- Add Employee ----------
      employeePage.navigateToEmployeeList();
      employeePage.searchAndDeleteIfExists(employee.employeeId);
      employeePage.addEmployeeWithoutLogin(employee.firstName, employee.lastName, employee.employeeId);

      // ---------- Assign Leave ----------
      leavePage.openAddEntitlements();
      leavePage.addEntitlement(employee.firstName, employee.leaveType, getLeaveDays(employee.leaveDays));

      // ---------- Apply Leave ----------
      leavePage.openApplyLeave();
      leavePage.applyLeave(employee.leaveType);

    });
  });
});
