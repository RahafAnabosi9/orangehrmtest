import { BuzzSelectors } from "./BuzzSelectors";

class BuzzPage {

  open() {
    cy.get(BuzzSelectors.TAB).click();
    cy.get(BuzzSelectors.POST_INPUT).should('be.visible');
  }

  createPost(text: string) {
    cy.get(BuzzSelectors.POST_INPUT).type(text);
    cy.get(BuzzSelectors.POST_SUBMIT).click();
    cy.contains(text).should('exist');
  }

  likeFirstPost() {
    cy.get(BuzzSelectors.LIKE_BUTTON).first().click();
  }

  commentOnFirstPost(comment: string) {
    cy.get(BuzzSelectors.COMMENT_BUTTON).first().click();
    cy.get(BuzzSelectors.COMMENT_INPUT).type(comment);
    cy.get(BuzzSelectors.COMMENT_SUBMIT).click();
  }

}

export default BuzzPage;
