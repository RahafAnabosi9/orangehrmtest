export class LeavePage {

  // ---------- فتح صفحة "Add Entitlements" ----------
  openAddEntitlements() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Entitlements', { timeout: 10000 }).click({ force: true });
    cy.contains('Add Entitlements', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/addLeaveEntitlement');
  }

  // ---------- إضافة Entitlement ----------
  addEntitlement(employeeName: string, leaveType: string, leaveDays: number) {
    // اختيار الموظف
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
      .clear()
      .type(employeeName);

    cy.contains('.oxd-autocomplete-option', employeeName, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // اختيار نوع الإجازة
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // اختيار الموقع / الرصيد
    cy.get('.oxd-select-text-input').eq(1).click({ force: true });
    cy.get('.oxd-select-option', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($options) => {
        cy.wrap($options[$options.length - 1]).click({ force: true });
      });

    // ⚡ الانتظار القصير قبل إدخال عدد الأيام
    cy.wait(500);

    // إدخال عدد الأيام
    cy.get('input.oxd-input.oxd-input--active[type="number"]', { timeout: 20000 })
      .should('be.visible')
      .clear({ force: true })
      .type(leaveDays.toString(), { force: true });

    // حفظ
    cy.contains('button', 'Save').click({ force: true });
    cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');
  }

  // ---------- فتح صفحة "Apply Leave" ----------
  openApplyLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Apply', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/applyLeave');
  }

  // ---------- تقديم طلب إجازة ----------
  applyLeave(leaveType: string) {
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // تحديد التواريخ (اختر اليوم التاليين كمثال)
    cy.get('input[placeholder="yyyy-mm-dd"]').first().click();
    cy.get('div[role="option"]').eq(1).click();
    cy.get('input[placeholder="yyyy-mm-dd"]').last().click();
    cy.get('div[role="option"]').eq(2).click();

    cy.get('textarea[placeholder="Type comment here"]', { timeout: 10000 })
      .type('Automated leave request');

    cy.contains('button', 'Submit').click({ force: true });
    cy.contains('.oxd-toast', 'Successfully Saved', { timeout: 10000 }).should('be.visible');
  }

  // ---------- فتح صفحة "Assign Leave" ----------
  openAssignLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Assign Leave', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/assignLeave');
  }
}
