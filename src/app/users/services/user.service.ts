import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(loginUser : User): Observable<any> {
    return this.http.post('http://localhost:5137/api/User/login', loginUser)
    .pipe(
      catchError((error) => {
        console.log("Error en login", error);
        return throwError(() => error);
      }
    )
  )};

  createUser(newUser : User): Observable<any> {
    return this.http.post('http://localhost:5137/api/User/register', newUser)
    .pipe(
      catchError((error) => {
        console.log("Error en createUser", error);
        return EMPTY;
      }
    )
  )};
}
