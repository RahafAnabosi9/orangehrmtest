import LoginPage from "../../support/pages/LoginPage";
import { BuzzSelectors } from "../../support/pages/BuzzSelectors";

const login = new LoginPage();
const Posts = require('../../fixtures/post.json');

describe('Filter and Like specific Buzz Posts', () => {

    beforeEach(() => {
        cy.visit('/web/index.php/auth/login');
        login.login('Admin', 'admin123');
        cy.get(BuzzSelectors.TAB).click();
    });

    it(`Filter & Like the post: PostNamelang}`, () => {
        cy.get(BuzzSelectors.POST_CONTAINER, { timeout: 10000 })
            .should('be.visible')
            .click();


        cy.get(BuzzSelectors.POST_INPUT, { timeout: 10000 })
            .should('be.visible')
            .as('postInput');

const posttext="rahaf"
        cy.get('@postInput').type(posttext, { force: true });

        cy.get(BuzzSelectors.POST_SUBMIT).click({ force: true });


        cy.contains(posttext, { timeout: 20000 }).should('exist');
       

        cy.contains(posttext)
            .closest('div.orangehrm-buzz')
            .find('#heart-svg')
            .click({ force: true })
            .should('have.class', 'active');

             cy.get(".orangehrm-buzz").filter(`:contains(")`)
    });
});


