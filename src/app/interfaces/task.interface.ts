import { FormControl } from '@angular/forms';

export interface ITask {
  title: string | FormControl<string> | undefined;
  description: string | FormControl<string> | undefined;
  priority: string | FormControl<string> | undefined;
  startDate: string | FormControl<string> | undefined;
  finalDate: string | FormControl<string> | undefined;
}
