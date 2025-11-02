import LoginPage from "../../support/pages/LoginPage";

const login = new LoginPage();

describe('Add 5 Buzz Posts in 5 Languages (final stable)', () => {

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');

    login.performLogin('Admin', 'admin123');

    cy.contains('span', 'Buzz', { timeout: 10000 }).click();

    cy.intercept('GET', '/web/index.php/api/v2/buzz/feed*').as('feed');
    cy.wait('@feed');
  });

  it('Posts 5 multilingual posts', () => {

    const POST_CONTAINER = 'div.orangehrm-buzz-create-post';
    const POST_INPUT = 'textarea.oxd-buzz-post-input';
    const POST_BUTTON = `${POST_CONTAINER} button[type="submit"]`;

    const buzzMessages = [
      "Hello!",
      "مرحبا!",
      "Bonjour!",
      "Hola!",
      "Hallo!"
    ];

    buzzMessages.forEach(text => {

      // افتحي صندوق الكتابة لتفعيل textarea
      cy.get(POST_CONTAINER).click();

      // أعيدي جلب textarea قبل الكتابة (حتى نتجنب انفصال DOM)
      cy.get(POST_INPUT, { timeout: 10000 })
        .should('be.visible')
        .then($el => {
          cy.wrap($el).type(text, { delay: 30, force: true });
        });

      // نشر البوست
      cy.get(POST_BUTTON).click({ force: true });

      // تأكيد أنه انضاف
      cy.contains(text, { timeout: 15000 }).should('exist');
    });
  });

});
