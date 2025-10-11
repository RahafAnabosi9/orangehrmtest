export default class AddEmployee {
  elements = {
    // نستخدم مجموعة selectors احتياطية لأن الـ DOM قد يختلف بين نسخ الواجهة
    firstName: () =>
      cy.get(
        'input[name="firstName"], input[placeholder*="First"], input[aria-label*="First"]',
        { timeout: 15000 }
      ).first(),
    middleName: () =>
      cy.get(
        'input[name="middleName"], input[placeholder*="Middle"], input[aria-label*="Middle"]',
        { timeout: 15000 }
      ).first(),
    lastName: () =>
      cy.get(
        'input[name="lastName"], input[placeholder*="Last"], input[aria-label*="Last"]',
        { timeout: 15000 }
      ).first(),
    // selector مرن للـ employee id (يحاول name أو placeholder أو aria-label)
    employeeId: () =>
      cy.get(
        'input[name="employeeId"], input[placeholder*="Employee"], input[placeholder*="Id"], input[aria-label*="Employee"]',
        { timeout: 10000 }
      ).first(),
    saveButton: () => cy.contains('button', 'Save', { timeout: 10000 })
  };

  save() {
    // نضغط زر الحفظ بطريقة موثوقة
    this.elements.saveButton().should('be.visible').click();
  }
}






/**import { First_Name, Middl_eName, last_Name, Employee_Id1 } from "cypress/support/helper/constents";

class AddEmployee {
  elements = {
    firstName: () => cy.get('input[placeholder="First Name"]'),
    middleName: () => cy.get('input[placeholder="Middle Name"]'),
    lastName: () => cy.get('input[placeholder="Last Name"]'),
   employeeId: () => cy.get('input[id*="employeeId"] ', {timeout:10000}), 
    savebtn: () => cy.get('button[type="submit"]'),
  }

  addemployee(newEmployee: Employee) {
   this.elements.firstName().clear().type(newEmployee.firstName);
    this.elements.middleName().clear().type(newEmployee.middleName);
    this.elements.lastName().clear().type(newEmployee.lastName);
    this.elements.employeeId().clear().type(Employee_Id1);
    this.elements.savebtn().should('be.enabled').click();
    cy.contains(First_Name).should('exist');
  }
}
export default AddEmployee;**/
