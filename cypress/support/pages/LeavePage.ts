export default class LeavePage {

  openAddEntitlements() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Entitlements', { timeout: 10000 }).click({ force: true });
    cy.contains('Add Entitlements', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/addLeaveEntitlement');
  }

  addEntitlement(employeeName: string, leaveType: string, leaveDays: number) {

    // كتابة اسم الموظف واختياره
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
      .clear()
      .type(employeeName);

    cy.contains('.oxd-autocomplete-option', employeeName, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // اختيار نوع الإجازة
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // اختيار فترة الاستحقاق
    cy.get('.oxd-select-text-input').eq(1).click({ force: true });
    cy.get('.oxd-select-option', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($options) => {
        cy.wrap($options[$options.length - 1]).click({ force: true });
      });

    // إدخال عدد الأيام
    cy.wait(500);
    cy.get('input.oxd-input.oxd-input--active', { timeout: 20000 })
      .eq(1)
      .should('be.visible')
      .clear({ force: true })
      .type(leaveDays.toString(), { force: true });

    // حفظ
    cy.contains('button', 'Save').click({ force: true });

    // التحقق من ظهور نافذة تأكيد
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.text().includes('Updating Entitlement')) {
        cy.contains('button', 'Confirm', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
        cy.log('Confirm clicked after update popup');
      } else {
        cy.log('No entitlement update popup found');
      }
    });

    // التحقق الذكي من رسالة النجاح (مع إعادة محاولة)
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-toast').length > 0) {
        cy.get('.oxd-toast', { timeout: 20000 })
          .should('exist')
          .and('contain.text', 'Success');
        cy.log('Toast appeared successfully');
      } else {
        cy.log('No toast found initially, retrying...');
        cy.wait(2000);
        cy.get('.oxd-toast', { timeout: 10000 })
          .should('exist')
          .and('contain.text', 'Success');
      }
    });

    // تأكيد إضافي في حال بقي زر Confirm آخر
    cy.wait(1000);
    cy.get('body', { timeout: 10000 }).then(($body) => {
      const confirmBtn = $body.find('button.oxd-button--secondary:contains("Confirm")');
      if (confirmBtn.length > 0) {
        cy.wrap(confirmBtn)
          .should('be.visible')
          .click({ force: true });
        cy.log('Confirm button clicked at the end');
      } else {
        cy.log(' No Confirm button found at the end');
      }
    });
  }
   confirmAction() {
    cy.contains('button', 'Confirm', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

 /** openApplyLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Apply', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/applyLeave');
  }

  applyLeave(leaveType: string) {
    // اختيار نوع الإجازة
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // اختيار التواريخ (من / إلى)
    cy.get('input[placeholder="yyyy-mm-dd"]', { timeout: 10000 })
      .should('have.length.at.least', 2);

    cy.get('input[placeholder="yyyy-mm-dd"]').first().click({ force: true });
    cy.get('div[role="option"]').eq(1).click({ force: true });

    cy.get('input[placeholder="yyyy-mm-dd"]').last().click({ force: true });
    cy.get('div[role="option"]').eq(2).click({ force: true });

    // كتابة تعليق
    cy.get('textarea[placeholder="Type comment here"]', { timeout: 10000 })
      .type('Automated leave request');

    // إرسال الطلب
    cy.contains('button', 'Submit').click({ force: true });

    // انتظار رسالة النجاح
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-toast').length > 0) {
        cy.get('.oxd-toast', { timeout: 15000 })
          .should('exist')
          .and('contain.text', 'Success');
      } else {
        cy.log('⚠️ No toast found after submitting leave');
      }
    });
  }

 

  openAssignLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Assign Leave', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/assignLeave');
  }**/
}
