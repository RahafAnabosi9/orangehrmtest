import LoginPage from "../../support/pages/LoginPage";
import { BuzzSelectors } from "../../support/pages/BuzzSelectors";

const login = new LoginPage();
const Posts = require('../../fixtures/post.json');


describe('Buzz Actions', () => {

    beforeEach(() => {
        cy.visit('/web/index.php/auth/login');
        login.login('Admin', 'admin123');
        cy.url().should('include', '/dashboard');

        cy.get(BuzzSelectors.TAB).click();
        cy.url().should('include', '/buzz');
    });


    Posts.forEach((text) => {

        it(text.PostNamelang, () => {


            // مراقبة POST و GET قبل أي تفاعل
            cy.intercept('POST', '/web/index.php/api/v2/buzz/posts').as('postCreated');
            cy.intercept('GET', '/web/index.php/api/v2/buzz/feed*').as('feedReload');

            // افتح صندوق الكتابة وانتظر ظهوره
            cy.get(BuzzSelectors.POST_CONTAINER, { timeout: 10000 })
                .should('be.visible')
                .click();


            cy.get(BuzzSelectors.POST_INPUT, { timeout: 10000 })
                .should('be.visible')
                .as('postInput');

            cy.get('@postInput').type(text.Puzzpost, { force: true });

            cy.get(BuzzSelectors.POST_SUBMIT).click({ force: true });

            //  لتأكيد نشر البوست
            // cy.wait('@postCreated');
            cy.wait('@feedReload', { timeout: 15000 });

            // تأكد أن النص ظهر في 
            cy.contains(text, { timeout: 20000 }).should('exist');

            // Like #heart-svg
            cy.get('#heart-svg', { timeout: 15000 })
                .first()
                .click({ force: true });

            cy.wait(1000);

            // بعد الضغط، أعد query للزر وتأكد من تفعيل اللايك
            cy.get('@#heart-svg', { timeout: 10000 })
                .first()
                .should('have.class', 'active');
        });
    });

 Posts.forEach((item) => {
    it(`Like: ${item.PostNamelang}`, () => {

      cy.contains(item.Puzzpost, { timeout: 20000 }).should('exist');

      cy.contains(item.Puzzpost)
        .closest('div.orangehrm-buzz')   
        .find('#heart-svg')              
        .click({ force: true })          
        .should('have.class', 'active');  
    });
  });
});


/*import LoginPage from "../../support/pages/LoginPage";
import { BuzzSelectors } from "../../support/pages/BuzzSelectors";

const login = new LoginPage();

describe('Buzz Actions', () => {

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
    login.login('Admin', 'admin123');
    cy.url().should('include', '/dashboard');

    cy.get(BuzzSelectors.TAB).click();
    cy.url().should('include', '/buzz');
  });

  it('Add 5 Buzz Posts and Like any Post', () => {

    const buzzMessages = ["Hello!", "مرحبا!", "Bonjour!", "Hola!", "Hallo!"];

    buzzMessages.forEach((text) => {

      // افتح صندوق الكتابة وانتظر ظهوره
      cy.get(BuzzSelectors.POST_CONTAINER, { timeout: 10000 })
        .should('be.visible')
        .click();

      // textarea باسم مستعار
      cy.get(BuzzSelectors.POST_INPUT, { timeout: 10000 })
        .should('be.visible')
        .as('postInput');

      cy.get('@postInput').type(text, { force: true });

      cy.get(BuzzSelectors.POST_SUBMIT).click({ force: true });

      // تأكد أن النص ظهر في feed
      cy.contains(text, { timeout: 20000 }).should('exist');
    });

    
    cy.get('#heart-svg', { timeout: 15000 })
      .first()
      .click({ force: true });

    // بعد الضغط، أعد query للزر وتأكد من تفعيل اللايك
    cy.get('#heart-svg', { timeout: 10000 })
      .first()
      .should('have.class', 'active');

  });

});**/



/**import LoginPage from "../../support/pages/LoginPage";

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
      "good morning",
      "صباح الخير!",
      "Bonjour!",
      "Hola!",
      "Hallo!"
    ];

    buzzMessages.forEach(text => {

      // افتحي صندوق الكتابة لتفعيل textarea
      cy.get(POST_CONTAINER).click();

      
      cy.get(POST_INPUT, { timeout: 10000 })
        .should('be.visible')
        .then($el => {
          cy.wrap($el).type(text, { delay: 30, force: true });
        });

      // نشر البوست
      cy.get(POST_BUTTON).click({ force: true });


    });
  });

});*/