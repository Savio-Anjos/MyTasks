import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, take } from 'rxjs';
import { ITask } from 'src/app/interfaces/task.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly API: string = 'http://localhost:8080/tasks/';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthorization(): HttpHeaders {
    const user: IUser = this.userService.getUser();
    console.log(user);
    const authHeader: string = `Basic ${btoa(
      `${user.username}:${user.password}`
    )}`;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: authHeader,
    });

    return headers;
  }

  public createTask(task: ITask): Observable<ITask> {
    const headers: HttpHeaders = this.getAuthorization();
    return this.http.post<ITask>(this.API, task, { headers }).pipe(take(1));
  }

  public getTasks(): Observable<ITask[]> {
    const headers: HttpHeaders = this.getAuthorization();
    return this.http.get<ITask[]>(this.API, { headers }).pipe(delay(2000));
  }

  public deleteTask(id: string): Observable<Object> {
    const headers: HttpHeaders = this.getAuthorization();

    return this.http.delete(this.API + id, { headers }).pipe(take(1));
  }

  public updateTask(id: string, task: ITask): Observable<ITask> {
    const headers: HttpHeaders = this.getAuthorization();

    return this.http.put<ITask>(this.API + id, task, { headers }).pipe(take(1));
  }
}
