import { Component } from '@angular/core';
import {
  FormControl,
  FormRecord,
  NonNullableFormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  public validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  public controlArray: Array<{ index: number; show: boolean }> = [];
  public isCollapse: boolean = true;

  constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, this.fb.control(''));
    }
  }

  public toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  public resetForm(): void {
    this.validateForm.reset();
  }
}
