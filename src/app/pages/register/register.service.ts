import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API: string = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {}

  public createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.API, user).pipe(take(1));
  }
}
