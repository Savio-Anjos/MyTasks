import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  public canActivate(): boolean {
    if (this.userService.getUser()) {
      return true;
    } else {
      this.router.navigate(['/register']);
      return false;
    }
  }
}
