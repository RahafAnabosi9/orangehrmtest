import LoginPage from "cypress/support/pages/LoginPage";
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

});


