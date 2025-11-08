class LoginPage {

  elements = {
    userName: () => cy.get('input[name="username"]'),
    passWord: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[type="submit"]')
  }

  login(username: string, password: string) {
    this.elements.userName().type(username);
    this.elements.passWord().type(password);
    this.elements.loginBtn().click();
  }

}

export default LoginPage;

/**class LoginPage {

  elements = {
    userName: () => cy.get('input[placeholder="Username"]'),
    passWord: () => cy.get('input[placeholder="Password"]'),
    loginBtn: () => cy.get('button[type="submit"]')
  }

  // ✅ الاسم الجديد الصحيح
  performLogin(userName: string, passWord: string) {
    this.elements.userName().clear().type(userName);
    this.elements.passWord().clear().type(passWord);
    this.elements.loginBtn().click();
  }

  invalidPassword(userName: string, passWord: string) {
    this.elements.userName().clear().type(userName);
    this.elements.passWord().clear().type(passWord);
    this.elements.loginBtn().click();
  }

  invalidUsername(userName: string, passWord: string) {
    this.elements.userName().clear().type(userName);
    this.elements.passWord().clear().type(passWord);
    this.elements.loginBtn().click();
  }
}

export default LoginPage;*/
