/// <reference types="cypress" />

describe('OrangeHRM - Add 5 Employees, Delete One, Show Remaining Names', () => {

  const employees = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Sarah', lastName: 'Smith' },
    { firstName: 'Ali', lastName: 'Khan' },
    { firstName: 'Maria', lastName: 'Lopez' },
    { firstName: 'Omar', lastName: 'Nasser' }
  ];

  const createdEmployees: { empId: number, firstName: string, lastName: string }[] = [];

  before(() => {
    cy.login('Admin', 'admin123');
  });

  it('Add 5 employees via API', () => {
    employees.forEach((emp) => {
      cy.api({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
          firstName: emp.firstName,
          middleName: '',
          lastName: emp.lastName,
          empPicture: null
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        const empId = res.body.data.empNumber;
        createdEmployees.push({ empId, firstName: emp.firstName, lastName: emp.lastName });
        cy.log(`✅ Added employee: ${emp.firstName} ${emp.lastName} (ID: ${empId})`);
      });
    });
  });

  it('Delete the first employee and show remaining names', () => {
    const empToDelete = createdEmployees[0];
    
    cy.api({
      method: 'DELETE',
      url: `/web/index.php/api/v2/pim/employees/${empToDelete.empId}`
    }).then((res) => {
      expect(res.status).to.eq(200);
      cy.log(`🗑️ Deleted employee: ${empToDelete.firstName} ${empToDelete.lastName} (ID: ${empToDelete.empId})`);

      // إزالة الموظف المحذوف من القائمة
      const remainingEmployees = createdEmployees.slice(1); // باقي الموظفين
      const remainingNames = remainingEmployees.map(emp => `${emp.firstName} ${emp.lastName}`);
      cy.log(`📋 Remaining employees: ${remainingNames.join(', ')}`);
    });
  });

});
