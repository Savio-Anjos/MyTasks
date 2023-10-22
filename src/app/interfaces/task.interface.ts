import { FormControl } from '@angular/forms';

export interface ITask {
  title: string | FormControl<string> | undefined;
  description: string | FormControl<string> | undefined;
  priority: string | FormControl<string> | undefined;
  startAt: string | FormControl<string> | undefined;
  endAt: string | FormControl<string> | undefined;
}
