import LoginPage from "../../support/pages/LoginPage";
import BuzzPage from "../../support/pages/BuzzPage";

const login = new LoginPage();
const buzz = new BuzzPage();

describe('Buzz Actions', () => {

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
    login.performLogin('Admin', 'admin123');
    cy.url().should('include', '/dashboard');
  });

  it('Post + Like + Comment', () => {

    buzz.open();

    const buzzList = [
      "Hello!",
      "مرحبا!",
      "Bonjour!",
      "Hola!",
      "Hallo!"
    ];

    buzzList.forEach(text => {
      buzz.createPost(text);
    });

    buzz.likeFirstPost();
    buzz.commentOnFirstPost("Nice!");

  });

});
