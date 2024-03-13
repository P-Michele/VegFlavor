import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/user';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import {first,catchError,tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  utenteLoggato$= new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id"> | undefined;

  httpOptions: {headers: HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router:Router
  ) {}

  register(user: Omit<User,"id">): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/api/user/register`,user,this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
      )
  }

 login(email: Pick<User,"email">, password: Pick<User,"password">): Observable<{
  token: string; userId: Pick<User,"id">}>
  {
    return this.http
    .post(`${environment.apiUrl}/api/user/login`,{email, password},this.httpOptions)
    .pipe(
      first(Object),
      tap((tokenObject: {token: string; userId: Pick<User,"id">})=>{
        this.userId=tokenObject.userId;
        localStorage.setItem("token",tokenObject.token);
        this.utenteLoggato$.next(true);
        this.router.navigate(['/home']);
      }),
      catchError(this.errorHandlerService.handleError<{
        token: string; userId: Pick<User,"id">
      }>("login"))
      );
  }
  
}
