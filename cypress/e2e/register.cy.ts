describe('Registration page', () => {
  it('Form Validation Test', () => {
    cy.visit('/register');
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('.login-form-button').click();
    cy.get('input[formcontrolname="name"]').type('UserTest');
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('input[formcontrolname="username"]').type('UsernameTest');
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('input[formcontrolname="password"').type('PasswordTest');
  });
});
