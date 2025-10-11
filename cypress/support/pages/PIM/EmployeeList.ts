export default class EmployeeList {
  elements = {
    employeeNameField: () =>
      cy.get(
        'input[placeholder="Type for hints..."], input[placeholder*="Employee Name"], input[aria-label*="employee"]',
        { timeout: 15000 }
      ).first(),
    employeeIdField: () =>
      cy.get(
        'input[name="empsearch[id]"], input[placeholder*="Employee Id"], input[placeholder*="Id"], input[aria-label*="ID"]',
        { timeout: 10000 }
      ).first(),
    searchButton: () => cy.contains('button', 'Search', { timeout: 10000 }),
    deleteButtonInRow: (rowIndex = 0) =>
      // نحاول إيجاد أي أيقونة سطل مهملات داخل الصف الأول كخيار افتراضي
      cy.get('.oxd-table-body .oxd-table-card', { timeout: 10000 }).eq(rowIndex).find('.oxd-icon.bi-trash').first()
  };

  employeelist() {
    this.elements.searchButton().click();
  }
}

