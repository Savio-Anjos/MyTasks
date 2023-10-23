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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  public taskForm: FormGroup = {} as FormGroup;

  public tasks: ITask[] = [];
  public isCreating: boolean = true;
  public titleButton: string = '';
  private id: string = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private homeService: HomeService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.initializeVariables();
    this.listTasks();
  }

  private initializeVariables(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      startAt: ['', [Validators.required]],
      endAt: ['', [Validators.required]],
      startAtTime: ['', [Validators.required]],
      endAtTime: ['', [Validators.required]],
    });
    this.titleButton = 'Cadastrar';
  }

  public submitForm(): void {
    if (this.taskForm.valid) {
      if (this.isCreating) {
        const taskForm = this.taskForm.value;
        const startAtTrated: string = `${taskForm.startAt}T${taskForm.startAtTime}`;
        const endAtTrated: string = `${taskForm.endAt}T${taskForm.endAtTime}`;

        const task: ITask = {
          id: '',
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
            this.listTasks();
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
        this.updateTask();
      }
    } else {
      Object.values(this.taskForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public formatDateAndTime(dateTime: string): {
    date: string | null;
    time: string | null;
  } {
    const date: string | null = this.datePipe.transform(dateTime, 'dd/MM/yyyy');
    const time: string | null = this.datePipe.transform(dateTime, 'HH:mm');
    return { date, time };
  }

  public formatTaskList(tasks: ITask[]): void {
    this.tasks = tasks.map((task) => {
      const { date: startAtDate, time: startAtTime } = this.formatDateAndTime(
        task.startAt
      );
      const { date: endAtDate, time: endAtTime } = this.formatDateAndTime(
        task.endAt
      );

      const formattedTask: ITask = {
        ...task,
        startAtDate,
        startAtTime,
        endAtDate,
        endAtTime,
      };

      return formattedTask;
    });
  }

  public listTasks(): ITask[] {
    this.homeService.getTasks().subscribe((tasks: ITask[]) => {
      this.formatTaskList(tasks);
      this.tasks = tasks;

      console.log(this.tasks);
    });

    return this.tasks;
  }

  public deleteTask(id: string): void {
    this.homeService.deleteTask(id).subscribe(
      () => {
        this.toastr.success('Tarefa deletada com sucesso!');
        this.listTasks();
      },
      (error) => {
        if (error.status === 400) {
          console.error('Erro ao deletar tarefa:', error);
          this.toastr.warning(error.error);
        } else {
          console.error('Erro ao deletar tarefa:', error);
          this.toastr.error(
            'Ocorreu um erro ao deletar a tarefa. Por favor, tente novamente.'
          );
        }
      }
    );
  }

  public fillOutForm(id: string, task: ITask): void {
    this.isCreating = false;
    this.id = id;
    this.titleButton = 'Atualizar';

    const startAt = this.formatDateAndTime(task.startAt);
    const endAt = this.formatDateAndTime(task.endAt);
    const startDate: string | null = this.datePipe.transform(
      task.startAt,
      'yyyy-MM-dd'
    );
    const endDate: string | null = this.datePipe.transform(
      task.endAt,
      'yyyy-MM-dd'
    );

    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      startAt: startDate,
      endAt: endDate,
      startAtTime: startAt.time,
      endAtTime: endAt.time,
    });
  }

  public updateTask(): void {
    const taskForm: ITask = this.taskForm.value;

    const startDateFormated = `${taskForm.startAt}T${taskForm.startAtTime}`;
    const endDateFormated = `${taskForm.endAt}T${taskForm.endAtTime}`;

    const dataTask: ITask = {
      id: this.id,
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      startAt: startDateFormated,
      endAt: endDateFormated,
    };

    console.log(dataTask);

    this.homeService.updateTask(this.id, dataTask).subscribe(
      (task) => {
        console.log(task);
        this.toastr.success('Tarefa Atualizada com sucesso!');
        this.taskForm.reset();
        this.listTasks();
        this.isCreating = true;
        this.titleButton = 'Cadastrar';
      },
      (error) => {
        if (error.status === 400) {
          console.error('Erro ao atualizar tarefa:', error);
          this.toastr.warning(error.error);
        } else {
          console.error('Erro ao atualizar tarefa:', error);
          this.toastr.error(
            'Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente.'
          );
        }
      }
    );
  }
}
