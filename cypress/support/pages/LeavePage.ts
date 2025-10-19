export default class LeavePage {

  openAddEntitlements() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Entitlements', { timeout: 10000 }).click({ force: true });
    cy.contains('Add Entitlements', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/addLeaveEntitlement');
  }

  addEntitlement(employeeName: string, leaveType: string, leaveDays: number) {
    // 🔹 إدخال اسم الموظف
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
      .clear()
      .type(employeeName);

    cy.contains('.oxd-autocomplete-option', employeeName, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // 🔹 اختيار نوع الإجازة
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // 🔹 اختيار موقع أو مجموعة الموظف (الاختيار الثاني)
    cy.get('.oxd-select-text-input').eq(1).click({ force: true });
    cy.get('.oxd-select-option', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($options) => {
        cy.wrap($options[$options.length - 1]).click({ force: true });
      });

    // 🔹 إدخال عدد الأيام
    cy.wait(500);
    cy.get('input.oxd-input.oxd-input--active', { timeout: 20000 })
      .eq(1)
      .should('be.visible')
      .clear({ force: true })
      .type(leaveDays.toString(), { force: true });

    // 🔹 الضغط على حفظ
    cy.contains('button', 'Save').click({ force: true });

    // 🔹 التعامل مع نافذة "Updating Entitlement" إذا ظهرت
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.text().includes('Updating Entitlement')) {
        cy.contains('button', 'Confirm', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
        cy.log('✅ Confirm clicked');
      } else {
        cy.log('ℹ️ No entitlement update popup found');
      }
    });

    // 🔹 انتظار رسالة النجاح بعد الحفظ أو التحديث
    cy.get('.oxd-toast', { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', 'Success');
  }

  openApplyLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Apply', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/applyLeave');
  }

  applyLeave(leaveType: string) {
    // 🔹 اختيار نوع الإجازة
    cy.get('.oxd-select-text-input').first().click({ force: true });
    cy.get('.oxd-select-text-input').first().type(`${leaveType}{enter}`);

    // 🔹 اختيار التواريخ (من / إلى)
    cy.get('input[placeholder="yyyy-mm-dd"]', { timeout: 10000 })
      .should('have.length.at.least', 2);

    cy.get('input[placeholder="yyyy-mm-dd"]').first().click({ force: true });
    cy.get('div[role="option"]').eq(1).click({ force: true });

    cy.get('input[placeholder="yyyy-mm-dd"]').last().click({ force: true });
    cy.get('div[role="option"]').eq(2).click({ force: true });

    // 🔹 إدخال تعليق
    cy.get('textarea[placeholder="Type comment here"]', { timeout: 10000 })
      .type('Automated leave request');

    // 🔹 إرسال الطلب
    cy.contains('button', 'Submit').click({ force: true });

    // 🔹 انتظار رسالة النجاح
    cy.get('.oxd-toast', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Success');
  }

  openAssignLeave() {
    cy.contains('Leave', { timeout: 10000 }).click({ force: true });
    cy.contains('Assign Leave', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/assignLeave');
  }
}
