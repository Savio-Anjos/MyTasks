import { FormControl } from '@angular/forms';

export interface ITask {
  id: string;
  title: string | FormControl<string> | undefined;
  description: string | FormControl<string> | undefined;
  priority: string | FormControl<string> | undefined;
  startAt: string;
  endAt: string;
  startAtDate?: string | null;
  startAtTime?: string | null;
  endAtDate?: string | null;
  endAtTime?: string | null;
}
