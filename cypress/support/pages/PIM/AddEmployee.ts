class AddEmployee {
  elements = {
    firstname: () => cy.get('input[name="firstName"]'),
    middlename: () => cy.get('input[name="middleName"]'),
    lastname: () => cy.get('input[name="lastName"]'),
  }

  addemployee() {
    this.elements.firstname().type("Rahaf");
    this.elements.middlename().type("Omar");
    this.elements.lastname().type("Anabosi");
  }
}
export default AddEmployee;
