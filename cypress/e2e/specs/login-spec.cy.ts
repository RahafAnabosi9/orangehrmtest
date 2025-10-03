import LoginPage from "cypress/support/pages/LoginPage";
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import EmployeeList from "cypress/support/pages/PIM/EmployeeList";

const loginobj = new LoginPage();
const addEmp = new AddEmployee();
const empList = new EmployeeList();

describe('OrangeHRM Tests', () => {

  it('Add new employee and search', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    loginobj.login();

    cy.url().should('include', '/dashboard');
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    addEmp.addemployee();

    cy.contains('Employee List').click();
    empList.employeelist();
  });

});

