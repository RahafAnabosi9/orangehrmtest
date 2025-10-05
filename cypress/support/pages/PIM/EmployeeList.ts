import { Employee_Name, Employee_Id } from "cypress/support/helper/constents";

class EmployeeList {
  elements = {
    employeeName: () => cy.get('input[placeholder="Type for hints..."]'),
    employeeId: () => cy.get('input[placeholder="Employee Id"]'),
    searchBtn: () => cy.get('button[type="submit"]'),
  }

  employeelist() {
    this.elements.employeeName().type(Employee_Name);
    cy.get('.oxd-autocomplete-option').contains(Employee_Name).click();
    this.elements.employeeId().type(Employee_Id);
    this.elements.searchBtn().click();
    cy.get('table').should('contain', Employee_Name);
  }
}
export default EmployeeList;


