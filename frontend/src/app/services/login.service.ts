import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/user';
import { BehaviorSubject, Observable} from 'rxjs';
import {first,catchError,tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url="http://localhost:3000/login";

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

  signup(user: Omit<User,"id">): Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,user,this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
      )
  }

  login(email: Pick<User,"email">, password: Pick<User,"password">): Observable<{
  token: string; userId: Pick<User,"id">}>
  {
    return this.http
    .post(`${this.url}/login`,{email, password},this.httpOptions)
    .pipe(
      first(Object),
      tap((tokenObject: {token: string; userId: Pick<User,"id">})=>{
        this.userId=tokenObject.userId;
        localStorage.setItem("token",tokenObject.token);
        this.utenteLoggato$.next(true);
        this.router.navigate(["profilo"]);
      }),
      catchError(this.errorHandlerService.handleError<{
        token: string; userId: Pick<User,"id">
      }>("login"))
      );
  }
}
