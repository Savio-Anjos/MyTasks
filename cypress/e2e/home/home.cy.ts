import { faker } from '@faker-js/faker';
import { ITask } from 'src/app/interfaces/task.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';

interface IFormattedDates {
  startAt: string;
  endAt: string;
  startAtTime: string;
  endAtTime: string;
}

let user: IUser = {} as IUser;
let task: ITask = {} as ITask;

function generateUserData(): void {
  let username = faker.internet.userName();
  let password = faker.internet.password();
  user = {
    name: username,
    username,
    password,
  };
}

function generateFormattedDate(): IFormattedDates {
  const startAt: Date = faker.date.between(new Date(), new Date(2023, 11, 31));
  const endAt: Date = faker.date.between(
    new Date(2024, 1, 1),
    new Date(2024, 11, 31)
  );
  const startAtTime: Date = faker.date.recent();
  const endAtTime: Date = faker.date.recent();

  const formattedDates: IFormattedDates = {
    startAt: format(startAt, 'yyyy-MM-dd', { locale: enUS }),
    endAt: format(endAt, 'yyyy-MM-dd', { locale: enUS }),
    startAtTime: format(startAtTime, 'HH:mm', { locale: enUS }),
    endAtTime: format(endAtTime, 'HH:mm', { locale: enUS }),
  };
  return formattedDates;
}

function generateTaskData(): void {
  const title: string = faker.string.alpha({ length: { min: 7, max: 14 } });
  const description: string = faker.string.alpha({
    length: { min: 10, max: 18 },
  });
  const priority: string = faker.string.alpha(4);
  const formattedDates: IFormattedDates = generateFormattedDate();

  const startAt: string = formattedDates.startAt;
  const endAt: string = formattedDates.endAt;
  const startAtTime: string = formattedDates.startAtTime;
  const endAtTime: string = formattedDates.endAtTime;

  task = {
    id: '',
    title,
    description,
    priority,
    startAt,
    endAt,
    startAtTime,
    endAtTime,
  };
}
generateUserData();
generateTaskData();

function registerUser(): void {
  cy.visit('/register');
  cy.get('input[formcontrolname="name"]').type(user.name);
  cy.get('input[formcontrolname="username"]').type(user.username);
  cy.get('input[formcontrolname="password"').type(user.password);
  cy.get('.login-form-button').click();
  cy.wait(6000);
  cy.url().should('include', '/home');
  generateUserData();
}

function checkAlert(): void {
  cy.get('.login-form-button').click();
  cy.get('.ant-form-item-explain-error').should('be.visible');
}

describe('Home Page', () => {
  it('Validate task form', () => {
    registerUser();

    cy.get('input[formcontrolname="title"]').type(task.title);
    checkAlert();
    cy.get('input[formcontrolname="description"').type(task.description);
    checkAlert();
    cy.get('nz-select[formcontrolname="priority"]').click();
    cy.get('.ant-select-item-option-content').first().click();
    checkAlert();
    cy.get('input[formcontrolname="startAt"]').type(task.startAt);
    checkAlert();
    cy.get('input[formcontrolname="endAt"]').type(task.endAt);
    checkAlert();
    cy.get('input[formcontrolname="startAtTime"]').type(task.startAtTime ?? '');
    checkAlert();
    cy.get('input[formcontrolname="endAtTime"]').type(task.endAtTime ?? '');
  });

  it('Create Task', () => {
    registerUser();

    cy.get('input[formcontrolname="title"]').type(task.title);
    cy.get('input[formcontrolname="description"').type(task.description);
    cy.get('nz-select[formcontrolname="priority"]').click();
    cy.get('.ant-select-item-option-content').first().click();
    cy.get('input[formcontrolname="startAt"]').type(task.startAt);
    cy.get('input[formcontrolname="endAt"]').type(task.endAt);
    cy.get('input[formcontrolname="startAtTime"]').type(task.startAtTime ?? '');
    cy.get('input[formcontrolname="endAtTime"]').type(task.endAtTime ?? '');
    cy.get('.login-form-button').click();
    cy.wait(1000);
    cy.get('.toast-success').should('be.visible');
    cy.wait(2000);
    cy.get('.ant-table-cell').should('be.visible');
  });
});
