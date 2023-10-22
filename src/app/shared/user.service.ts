import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: IUser;

  constructor(private cookieService: CookieService) {
    this.getUserData();
  }

  private getUserData(): void {
    const userData = this.cookieService.get('userData');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  public getUser(): IUser {
    return this.user;
  }

  public setUser(user: IUser) {
    this.user = user;
    this.cookieService.set('userData', JSON.stringify(user));
  }
}
