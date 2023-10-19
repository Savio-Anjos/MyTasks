import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormRecord,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

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
    startDate: FormControl<string>;
    finalDate: FormControl<string>;
    startTime: FormControl<string>;
    finalTime: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    finalDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    finalTime: ['', [Validators.required]],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {}

  public submitForm(): void {
    if (this.taskForm.valid) {
      const startDateTrated: string = `${this.taskForm.value.startDate}T${this.taskForm.value.startTime}`;

      console.log(this.taskForm.value);
      console.log(startDateTrated);
    }
  }
}
