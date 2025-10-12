class AddEmployee {

  elements = {
    searchSide: {
      searchInput: () => cy.get('input[placeholder="Type for hints..."]').first(),
      searchButton: () => cy.get('button[type="submit"]').filter(':visible').first(),
      tableBody: () => cy.get('div.oxd-table-body'),
      secondRowTrashIcon: () => cy.get('.oxd-table-row').eq(1).find('.oxd-icon.bi-trash'),
      confirmDeleteBtn: () => cy.get('button.oxd-button--label-danger').contains('Yes, Delete'),
    },
    addSide: {
      addButton: () => cy.contains('button', 'Add'),
      firstNameInput: () => cy.get('input[placeholder="First Name"]'),
      lastNameInput: () => cy.get('input[placeholder="Last Name"]'),
      employeeIdInput: () => cy.get('input.oxd-input.oxd-input--active').eq(3),
      createLoginDetailsCheckbox: () => cy.get('input[type="checkbox"]').first(),
      usernameInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(0),
      passwordInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(1),
      confirmPasswordInput: () => cy.get('.oxd-input[autocomplete="off"]').eq(2),
      saveButton: () => cy.contains('button', 'Save'),
      employeeFullNameLabel: (fullName: string) => cy.contains(fullName, { timeout: 10000 }),
    },
  };

  addNewEmployee(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    employeeId: string,
    fullName: string
  ) {
    cy.contains('PIM').click();
    cy.contains('Employee List').click();

    this.elements.searchSide.searchInput().type(username);
    this.elements.searchSide.searchButton().click();

    this.elements.searchSide.tableBody().then($body => {
      if ($body.find('.oxd-table-row').length >= 2) {
        this.elements.searchSide.secondRowTrashIcon().should('be.visible').click();
        this.elements.searchSide.confirmDeleteBtn().click();
        cy.wait(2000);
      }
    });

    this.elements.addSide.addButton().click();

    this.elements.addSide.firstNameInput().type(firstName);
    this.elements.addSide.lastNameInput().type(lastName);
    this.elements.addSide.employeeIdInput().clear().type(employeeId);
    this.elements.addSide.createLoginDetailsCheckbox().check({ force: true });

    this.elements.addSide.usernameInput().type(username);
    this.elements.addSide.passwordInput().type(password);
    this.elements.addSide.confirmPasswordInput().type(password);

    this.elements.addSide.saveButton().click();

    this.elements.addSide.employeeFullNameLabel(fullName).should('be.visible');
  }
}

export default AddEmployee;