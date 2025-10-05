//import { ADMIN_PASSWORD, ADMIN_USER  } from "cypress/support/helper/constents"

class LoginPage {
    element = {
        userName: () => cy.get('input[name="username"]'),
        password: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
    }


    login(userName, password) {
        this.element.userName().type(userName);
        this.element.password().type(password);
        this.element.loginBtn().click();

    }

}
export default LoginPage