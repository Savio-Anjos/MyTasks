import { IUser } from 'src/app/interfaces/user.interface';
import { faker } from '@faker-js/faker/locale/en';

let user: IUser = {} as IUser;

function generateUserData(): void {
  let username = faker.internet.userName();
  let password = faker.internet.password();
  user = {
    name: username,
    username,
    password,
  };
}

generateUserData();

describe('Registration page', () => {
  it('Form Validation Test', () => {
    cy.visit('/register');
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('.login-form-button').click();
    cy.get('input[formcontrolname="name"]').type(user.name);
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('input[formcontrolname="username"]').type(user.username);
    cy.get('.login-form-button').click();
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('input[formcontrolname="password"').type(user.password);
  });

  it('Test registration', () => {
    cy.visit('/register');
    cy.get('input[formcontrolname="name"]').type(user.name);
    cy.get('input[formcontrolname="username"]').type(user.username);
    cy.get('input[formcontrolname="password"').type(user.password);
    cy.get('.login-form-button').click();
    cy.wait(6000);
    cy.url().should('include', '/home');
  });
});
