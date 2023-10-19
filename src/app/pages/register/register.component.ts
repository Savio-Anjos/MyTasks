import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  public userForm: FormGroup<{
    name: FormControl<string>;
    username: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router
  ) {}

  public submitForm(): void {
    if (this.userForm.valid) {
      console.log('submit', this.userForm.value);

      const user: IUser = {
        name: this.userForm.value.name,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };

      this.registerService.createUser(user).subscribe((success: IUser) => {
        this.userService.setUser(success);
        const savedUser: IUser = this.userService.getUser();
        console.log(savedUser);
        this.router.navigate(['/home']);
      });
    } else {
      Object.values(this.userForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
