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
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  public submitForm(): void {
    if (this.userForm.valid) {
      console.log('submit', this.userForm.value);

      const user: IUser = {
        name: this.userForm.value.name,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };
      this.userService.setUser(user);

      this.registerService.createUser(user).subscribe(
        (user: IUser) => {
          const savedUser: IUser = this.userService.getUser();
          console.log(savedUser);
          this.toastr.success('Usuário criado com sucesso!');
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 400) {
            console.error('Erro ao criar usuário:', error);
            this.toastr.warning('Nome de usuário já existe!');
          } else {
            console.error('Erro ao criar usuário:', error);
            this.toastr.error(
              'Ocorreu um erro ao criar o usuário. Por favor, tente novamente.'
            );
          }
        }
      );
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
