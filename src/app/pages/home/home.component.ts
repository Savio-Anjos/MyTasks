import { Component, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HomeService } from './home.service';
import { ITask } from 'src/app/interfaces/task.interface';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  private id: string = '';
  public allTasks: ITask[] = [];
  public isCreating: boolean = true;
  public isLoading: boolean = false;
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public taskForm: FormGroup = {} as FormGroup;
  public tasks: ITask[] = [];
  public titleButton: string = '';
  public total: number = 0;
  public theme: string = '';

  constructor(
    private datePipe: DatePipe,
    private el: ElementRef,
    private fb: NonNullableFormBuilder,
    private homeService: HomeService,
    private themeService: ThemeService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeVariables();
    this.listTasks();
    this.getTheme();
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
    this.theme = 'dark';
  }

  public getTheme(): void {
    this.themeService.getTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public navToCreateTask(): void {
    const formElement = this.el.nativeElement.querySelector('#input-tasks');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public navToListTasks(): void {
    const formElement = this.el.nativeElement.querySelector('#container-list');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public submitForm(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      if (this.isCreating) {
        this.createTasks();
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

  public createTasks(): void {
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
    task;

    this.homeService.createTask(task).subscribe(
      (task: ITask) => {
        task;
        this.toastr.success('Tarefa criada com sucesso!');
        this.taskForm.reset();
        this.listTasks();
        this.isLoading = false;
        this.navToListTasks();
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
        this.isLoading = false;
      }
    );
  }

  public listTasks(): ITask[] {
    this.homeService.getTasks().subscribe((tasks: ITask[]) => {
      this.formatTaskList(tasks);
      this.tasks = tasks;
      this.allTasks = tasks;
      this.total = tasks.length;
      this.loadData();

      this.tasks;
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

    this.navToCreateTask();
  }

  public updateTask(): void {
    const taskForm: ITask = this.taskForm.value;

    const startDateFormated: string = `${taskForm.startAt}T${taskForm.startAtTime}`;
    const endDateFormated: string = `${taskForm.endAt}T${taskForm.endAtTime}`;

    const dataTask: ITask = {
      id: this.id,
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      startAt: startDateFormated,
      endAt: endDateFormated,
    };

    this.homeService.updateTask(this.id, dataTask).subscribe(
      (task) => {
        task;
        this.toastr.success('Tarefa Atualizada com sucesso!');
        this.taskForm.reset();
        this.listTasks();
        this.isCreating = true;
        this.titleButton = 'Cadastrar';
        this.navToListTasks();
        this.isLoading = false;
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
        this.isLoading = false;
      }
    );
  }

  public loadData(): void {
    const startIndex: number = (this.pageIndex - 1) * this.pageSize;
    const endIndex: number = startIndex + this.pageSize;
    this.tasks = this.allTasks.slice(startIndex, endIndex);
  }

  public pageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadData();
  }
}
