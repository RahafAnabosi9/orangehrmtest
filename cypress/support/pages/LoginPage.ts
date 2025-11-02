class LoginPage {

  elements = {
    userName: () => cy.get('input[placeholder="Username"]'),
    passWord: () => cy.get('input[placeholder="Password"]'),
    loginBtn: () => cy.get('button[type="submit"]')
  }

 
  login(userName: string, passWord: string) {
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

export default LoginPage;