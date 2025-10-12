class LoginPage {
  elements = {
    userName: () => cy.get('input[placeholder="Username"]'),
    passWord: () => cy.get('input[placeholder="Password"]'),
    loginBtn: () => cy.get('button[type="submit"]')
    
  }

  login(userName, passWord) {
    this.elements.userName().type(userName);
    this.elements.passWord().type(passWord);
    this.elements.loginBtn().click();
   

  }
  invalidPassword(userName, passWord){
this.elements.userName().type(userName);
    this.elements.passWord().type(passWord);
    this.elements.loginBtn().click();
 
  }
  invalidUsername(userName, passWord){
    this.elements.userName().type(userName);
    this.elements.passWord().type(passWord);
    this.elements.loginBtn().click();
   
  }
  addNewEmployee(userName,passWord,firstName,lastName,employeeId,fullName,subunit){

  }
}

export default LoginPage;