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


      cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-button-margin', { timeout: 10000 })
        .contains('Confirm')
        .should('be.visible')
        .click();

      cy.contains('Successfully Saved', { timeout: 10000 }).should('be.visible');


  }}
