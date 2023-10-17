import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: IUser;

  constructor() {}

  public getUser(): IUser {
    return this.user;
  }

  public setUser(user: IUser) {
    this.user = user;
  }
}
