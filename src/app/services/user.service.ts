import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line: variable-name
  private _url = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._url).pipe(catchError(this.errorHandler));
  }

  getUser(id): Observable<User[]> {
    return this.http.get<User[]>(this._url + id);
  }

  editUser(id, data) {
    return this.http.post(this._url + id, data);
  }

  deleteUser(id): Observable<User> {
    return this.http.delete<User>(this._url + '/' + id);
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }

}
