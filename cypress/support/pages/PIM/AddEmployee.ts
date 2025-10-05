import { First_Name, Middl_eName, last_Name, Employee_Id1 } from "cypress/support/helper/constents";

class AddEmployee {
  elements = {
    firstName: () => cy.get('input[placeholder="First Name"]'),
    middleName: () => cy.get('input[placeholder="Middle Name"]'),
    lastName: () => cy.get('input[placeholder="Last Name"]'),
   /// employeeId: () => cy.get('input[id*="employeeId"]', {timeout:10000}), 
    savebtn: () => cy.get('button[type="submit"]'),
  }

  addemployee() {
    this.elements.firstName().clear().type(First_Name);
    this.elements.middleName().clear().type(Middl_eName);
    this.elements.lastName().clear().type(last_Name);
    ///this.elements.employeeId().clear().type(Employee_Id1);
    this.elements.savebtn().should('be.enabled').click();
    cy.contains(First_Name).should('exist'); // تأكيد إنه انحفظ
  }
}
export default AddEmployee;
