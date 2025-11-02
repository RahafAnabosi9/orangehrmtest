import LoginPage from "../../support/pages/LoginPage";

const login = new LoginPage();

describe('Filter and Like specific Buzz Posts', () => {

    beforeEach(() => {
        cy.visit('/web/index.php/auth/login');
        login.login('Admin', 'admin123');
    });

 it(`profile pic`, () => {
    cy.visit('/web/index.php/pim/addEmployee')
const pic = 'cypress/fixtures/pic/123.jpeg';
cy.get('.oxd-file-input')
.selectFile(pic, {force: true});
       
});
});

