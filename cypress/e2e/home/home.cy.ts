import { faker } from '@faker-js/faker';
import { ITask } from 'src/app/interfaces/task.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';

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

function generateFormattedDate(): string {
  const date = faker.date.between(new Date(), new Date(2024, 11, 31));
  return format(date, 'yyyy-MM-dd', { locale: enUS });
}

function generateTaskData(): void {
  const title: string = faker.string.alpha({ length: { min: 7, max: 14 } });
  const description: string = faker.string.alpha({
    length: { min: 10, max: 18 },
  });
  const priority: string = faker.string.alpha(4);
  const startAt: string = generateFormattedDate();
  const endAt: string = generateFormattedDate();

  task = {
    id: '',
    title,
    description,
    priority,
    startAt,
    endAt,
  };
}
generateUserData();
generateTaskData();

describe('Home Page', () => {
  it('Create Task', () => {
    cy.visit('/register');
    cy.get('input[formcontrolname="name"]').type(user.name);
    cy.get('input[formcontrolname="username"]').type(user.username);
    cy.get('input[formcontrolname="password"').type(user.password);
    cy.get('.login-form-button').click();
    cy.wait(6000);
    cy.url().should('include', '/home');

    cy.get('input[formcontrolname="title"]').type(task.title);
    cy.get('input[formcontrolname="description"').type(task.description);
    cy.get('input[formcontrolname="priority"]').type(task.priority);
    cy.get('input[formcontrolname="title"]').type(task.startAt);
    cy.get('input[formcontrolname="startAt"]').type(task.startAt);
    cy.get('input[formcontrolname="endAt"]').type(task.endAt);
  });
});
