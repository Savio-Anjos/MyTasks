import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
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
export class RegisterComponent implements OnInit {
  public userForm: FormGroup = {} as FormGroup;
  public isLoading: boolean = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeVariables();
  }

  private initializeVariables(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public submitForm(): void {
    if (this.userForm.valid) {
      console.log('submit', this.userForm.value);
      this.isLoading = true;
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
          this.isLoading = false;
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

          this.isLoading = false;
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
