import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interface';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/shared/theme.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public userForm: FormGroup = {} as FormGroup;
  public theme: string = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private themeService: ThemeService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.initializeVariables();
    this.getTheme();
  }

  private initializeVariables(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public getTheme(): void {
    this.themeService.getTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public submitForm(): void {
    if (this.userForm.valid) {
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
