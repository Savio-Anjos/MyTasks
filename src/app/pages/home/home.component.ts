import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormRecord,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ITask } from 'src/app/interfaces/task.interface';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  public taskForm: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    priority: FormControl<string>;
    startAt: FormControl<string>;
    endAt: FormControl<string>;
    startTime: FormControl<string>;
    finalTime: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    startAt: ['', [Validators.required]],
    endAt: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    finalTime: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private homeService: HomeService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {}

  public submitForm(): void {
    if (this.taskForm.valid) {
      const taskForm = this.taskForm.value;
      const startAtTrated: string = `${taskForm.startAt}T${taskForm.startTime}`;
      const endAtTrated: string = `${taskForm.endAt}T${taskForm.finalTime}`;

      const task: ITask = {
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        startAt: startAtTrated,
        endAt: endAtTrated,
      };
      console.log(task);

      this.homeService.createTask(task).subscribe(
        (task: ITask) => {
          console.log(task);
          this.toastr.success('Tarefa criada com sucesso!');
          this.taskForm.reset();
        },
        (error) => {
          if (error.status === 400) {
            console.error('Erro ao criar tarefa:', error);
            this.toastr.warning(error.error);
          } else {
            console.error('Erro ao criar tarefa:', error);
            this.toastr.error(
              'Ocorreu um erro ao criar a tarefa. Por favor, tente novamente.'
            );
          }
        }
      );
    } else {
      Object.values(this.taskForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
