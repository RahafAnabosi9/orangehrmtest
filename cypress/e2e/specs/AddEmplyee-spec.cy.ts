import LoginPage from "cypress/support/pages/LoginPage";
import EmployeePage from "cypress/support/pages/EmployeePage";
import { faker } from "@faker-js/faker";

const login = new LoginPage();
const employeePage = new EmployeePage();

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
    //login.login(users.valid.username, users.valid.password);
    cy.login(users.valid.username, users.valid.password)
    employeePage.navigateToEmployeeList();
    employeePage.searchAndDeleteIfExists(employee.employeeId);
    employeePage.addNewEmployee(employee);
  });

it.only('Login, add new employee', () => {
    //login.login(users.valid.username, users.valid.password);
    cy.login(users.valid.username, users.valid.password)
    cy.api(
      'POST',
      '/web/index.php/api/v2/pim/employees',
      {
    "firstName": "RASHED ",
    "middleName": "",
    "lastName": "al MAMOUN",
    "empPicture": null,
    "employeeId": "2679"
}
    
    )
    .then((response) =>{
      expect (response.status).to.eq(200);
      const empNumber = response.body.data.empNumber;
      cy.log('New employee ID:', empNumber);
      cy.request(
      'DELETE',
      '/web/index.php/api/v2/pim/employees',
      {
   "ids": [empNumber]
} 
    )
    });

  });


    
  });
  
