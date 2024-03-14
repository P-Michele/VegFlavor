import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of} from 'rxjs';
import {first,catchError,tap, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private jwtHelper!: JwtHelperService;
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  loggedUser= new BehaviorSubject<boolean>(false);

  httpOptions: {headers: HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  constructor(private http: HttpClient,private errorHandlerService: ErrorHandlerService,private router:Router )
  {
    this.jwtHelper = new JwtHelperService();
  }

  register(user: Omit<User,"id">):  Observable<string>
    {
      return this.http.post<{ token: string }>(`${environment.apiUrl}/api/user/register`, user, this.httpOptions)
      .pipe(
        first(),
        map(tokenObject => tokenObject.token),
        tap(token => {
          localStorage.setItem(this.JWT_TOKEN, token);
          this.loggedUser.next(true);
          this.router.navigate(['/home']);
        }),
        catchError(this.errorHandlerService.handleError<string>("register"))
      );
  }


 login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<string> {
  return this.http.post<{ token: string }>(
    `${environment.apiUrl}/api/user/login`,
    { email, password },
    this.httpOptions
  ).pipe(
    first(),
    map(tokenObject => tokenObject.token),
    tap(token => {
      localStorage.setItem(this.JWT_TOKEN, token);
      this.loggedUser.next(true);
      this.router.navigate(['/home']);
    }),
    catchError(this.errorHandlerService.handleError<string>("login"))
  );
}


  getCurrentUser(token:string): { name: string, id: string,surname:string,email:string,isAdmin:boolean } {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      id: decodedToken.Id,
      name: decodedToken.Name,
      surname: decodedToken.Surname,
      email:decodedToken.Email,
      isAdmin:decodedToken.IsAdmin
    };
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.loggedUser.next(false);
    this.router.navigate(['/login']);
  }
}
