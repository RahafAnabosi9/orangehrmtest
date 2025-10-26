/// <reference types="cypress" />

describe('OrangeHRM - Add Fixed Employees, Assign Leaves & Delete via API', () => {

  const employees = [
    { firstName: 'John', lastName: 'Doe', employeeId: 'E10011' },
    { firstName: 'Sarah', lastName: 'Smith', employeeId: 'E10021' },
    { firstName: 'Ali', lastName: 'Khan', employeeId: 'E10031' },
    { firstName: 'Maria', lastName: 'Lopez', employeeId: 'E10041' },
    { firstName: 'Omar', lastName: 'Nasser', employeeId: 'E10051' }
  ];

  const leaveCategories = [
    'CAN - Personal',
    'CAN - Vacation',
    'CAN - Maternity',
    'CAN - Paternity',
    'CAN - Sick'
  ];

  const createdEmployeeIds: string[] = [];

  before(() => {
    cy.login('Admin', 'admin123'); 
  });

  it(' Add 5 employees via API', () => {
    employees.forEach((emp) => {
      cy.api({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
          firstName: emp.firstName,
          middleName: '',
          lastName: emp.lastName,
          empPicture: null,
          employeeId: emp.employeeId
        }
      }).as("addemp")
      cy.wait('@addemp')
      .its('response')
      .should('eq', 200);
     
      /** .then((res) => {
        expect(res.status).to.eq(200);
        createdEmployeeIds.push(res.body.data.empNumber);
        cy.log(` Added employee ${emp.firstName} ${emp.lastName} (${res.body.data.empNumber})`);
      });*/
    });
  });
   

 it('Request 1 leave per employee from different category', () => {
    createdEmployeeIds.forEach((empId, index) => {
      cy.api({
        method: 'POST',
        url: '/web/index.php/api/v2/leave/leave-requests',
        body: {
          employeeId: empId,
          leaveType: leaveCategories[index],
          fromDate: '2025-10-20',
          toDate: '2025-10-22',
          comments: 'Test leave request'
        }
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);
        cy.log(`Leave requested for emp ${empId} (${leaveCategories[index]})`);
      });
    });
  });

  it(' Assign LeaveEntitlements to each employee', () => {
    createdEmployeeIds.forEach((empId, index) => {
      cy.api({
        method: 'POST',
        url: '/web/index.php/api/v2/leave/leave-entitlements',
        body: {
          employee: { id: empId },
          leaveType: { id: index + 1 }, 
          entitlement: 10 + index,
          fromDate: '2025-01-01',
          toDate: '2025-12-31'
        }
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);
        cy.log(` Leave entitlement assigned for emp ${empId}`);
      });
    });
  });

 /**  it('Delete all added employees', () => {
    createdEmployeeIds.forEach((empId) => {
      cy.api({
        method: 'DELETE',
        url: `/web/index.php/api/v2/pim/employees/${empId}`
      }).then((res) => {
        expect(res.status).to.eq(200);
        cy.log(`Deleted employee ${empId}`);
      });
    });
  });*/

});
