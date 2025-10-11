import LoginPage from "cypress/support/pages/LoginPage";
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import EmployeeList from "cypress/support/pages/PIM/EmployeeList";
import { faker } from "@faker-js/faker";

const loginPage = new LoginPage();
const addEmployeePage = new AddEmployee();
const employeeListPage = new EmployeeList();

describe("OrangeHRM Full Employee Flow", () => {
  let empId;
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const newFirstName = faker.person.firstName();

  before(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    cy.fixture("valied_users").then((valied_users) => {
      loginPage.login(valied_users[0].user, valied_users[0].pass);
    });
    cy.url().should("include", "/dashboard");
  });

  it("Add a new employee with Faker data", () => {
    cy.contains("PIM").click();
    cy.contains("Add Employee").click();

    addEmployeePage.elements.firstName().type(firstName);
    addEmployeePage.elements.middleName().type(middleName);
    addEmployeePage.elements.lastName().type(lastName);

    addEmployeePage.elements.employeeId().invoke("val").then((id) => {
      empId = id;
      cy.log(`Employee ID: ${empId}`);
    });

    addEmployeePage.elements.saveButton().click();

    cy.url().should("include", "/pim/viewPersonalDetails");
    cy.contains(firstName).should("exist");
  });

  it("Search employee by name", () => {
    cy.contains("PIM").click();
    cy.contains("Employee List").click();

    employeeListPage.elements.employeeNameField().type(firstName);
    employeeListPage.elements.searchButton().click();

    cy.contains(firstName).should("exist");
  });

  it("Search employee by ID", () => {
    cy.contains("PIM").click();
    cy.contains("Employee List").click();

    employeeListPage.elements.employeeIdField().type(empId);
    employeeListPage.elements.searchButton().click();

    cy.contains(empId).should("exist");
  });

  it("Edit employee details", () => {
    cy.contains("PIM").click();
    cy.contains("Employee List").click();

    employeeListPage.elements.employeeNameField().clear().type(firstName);
    employeeListPage.elements.searchButton().click();
    cy.wait(2000);
    cy.contains(firstName).click();

    cy.contains("Edit").click();
    addEmployeePage.elements.firstName().clear().type(newFirstName);
    addEmployeePage.elements.saveButton().click();

    cy.contains(newFirstName).should("exist");
  });

  it("Delete employee", () => {
    cy.contains("PIM").click();
    cy.contains("Employee List").click();

    employeeListPage.elements.employeeNameField().clear().type(newFirstName);
    employeeListPage.elements.searchButton().click();
    cy.wait(2000);

    employeeListPage.elements.deleteButton().click();
    cy.contains("Yes, Delete").click();

    cy.contains("No Records Found").should("exist");
  });
});


/**import LoginPage from "cypress/support/pages/LoginPage";
import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import EmployeeList from "cypress/support/pages/PIM/EmployeeList";
import { faker } from '@faker-js/faker';

const loginobj = new LoginPage();
const addEmp = new AddEmployee();
const empList = new EmployeeList();

describe('OrangeHRM Tests', () => {

  it('Add new employee and search', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.fixture('valied_users').then((valied_users) => {
      loginobj.login(valied_users[0].user, valied_users[0].pass);
    })


    cy.url().should('include', '/dashboard');
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    

    cy.contains('Employee List').click();
    empList.employeelist();
    
  });

    it('LOHIN WITH VALID USER', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const user = faker.internet.username();
    const password = faker.internet.password();
      loginobj.login(user,password);
    
  });

   it('Add new employee with Faker data', () => {
   
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
cy.fixture('valied_users').then((valied_users) => {
      loginobj.login(valied_users[0].user, valied_users[0].pass);
    })
    
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
   
    

    
  });

});**/





