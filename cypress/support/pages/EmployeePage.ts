class EmployeePage {
  // ---------- الانتقال إلى قائمة الموظفين ----------
  navigateToEmployeeList() {
    cy.url().should('include', '/dashboard');
    cy.contains('PIM').should('be.visible').click();
    cy.contains('Employee List').should('be.visible').click();
  }

  // ---------- البحث عن موظف وحذفه إذا وُجد ----------
  searchAndDeleteIfExists(employeeId) {
    cy.get('input.oxd-input.oxd-input--active').eq(1).clear().type(employeeId);
    cy.get('button[type="submit"]').filter(':visible').first().click();

    cy.get('div.oxd-table-body').then($body => {
      const rows = $body.find('.oxd-table-row');
      if (rows.length > 0) {
        cy.wrap(rows.eq(0)).find('.oxd-icon.bi-trash').click({ force: true });
        cy.get('button.oxd-button--label-danger').contains('Yes, Delete').click();
        cy.contains('Successfully Deleted').should('be.visible');
      } else {
        cy.log(`Employee with ID ${employeeId} not found, skipping delete.`);
      }
    });
  }

  // ---------- إضافة موظف بدون إنشاء بيانات دخول ----------
  addEmployeeWithoutLogin(firstName, lastName, employeeId) {
    cy.contains('button', 'Add').should('be.visible').click();

    // تعبئة الحقول الأساسية
    cy.get('input[placeholder="First Name"]').clear().type(firstName);
    cy.get('input[placeholder="Last Name"]').clear().type(lastName);

    // رقم الموظف
    cy.get('input.oxd-input.oxd-input--active').eq(3).clear().type(employeeId);

    // تأكد أن خيار "Create Login Details" غير محدد
    cy.get('input[type="checkbox"]').first().then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.wrap($checkbox).uncheck({ force: true });
      }
    });

    // حفظ
    cy.contains('button', 'Save').click();

    // تأكيد الإضافة
    cy.contains(`${firstName} ${lastName}`, { timeout: 10000 }).should('be.visible');
  }
}

export default EmployeePage;
