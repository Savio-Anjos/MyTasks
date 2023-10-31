export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: string;
  startAt: string;
  endAt: string;
  startAtDate?: string | null;
  startAtTime?: string | null;
  endAtDate?: string | null;
  endAtTime?: string | null;
}
