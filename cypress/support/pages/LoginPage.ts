import { ADMIN_PASSWORD, ADMIN_USER_NAME, BASE_URL } from "../helper/constents"
class LoginPage {
    element= {
        userName: () => cy.get('input[name="username"]'),
        password: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
    }
    
    login() {
        this.element.userName() .type(ADMIN_USER_NAME);
        this.element.password() .type(ADMIN_PASSWORD);
        this.element.loginBtn() .click();

    }

}
export default LoginPage