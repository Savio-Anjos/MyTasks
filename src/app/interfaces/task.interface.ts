import { FormControl } from '@angular/forms';

export interface ITask {
  id: string;
  title: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  startAt: string;
  endAt: string;
  startAtDate?: string | null;
  startAtTime?: string | null;
  endAtDate?: string | null;
  endAtTime?: string | null;
}
