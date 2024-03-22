import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import {first,catchError,tap, map} from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper!: JwtHelperService;
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  httpOptions: {headers: HttpHeaders}={
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  constructor(private http: HttpClient,private errorHandlerService: ErrorHandlerService,private router:Router )
  {
    this.jwtHelper = new JwtHelperService();
  }

  register(user: Omit<User, 'id'>): void {
    this.http.post<{ token: string }>(`${environment.apiUrl}/api/user/register`, user, this.httpOptions)
      .pipe(
        first(),
        tap(tokenObject => {
          const token = tokenObject.token;
          localStorage.setItem(this.JWT_TOKEN, token);
          this.router.navigate(['/home']);
        }),
        catchError(this.errorHandlerService.handleError<void>('register'))
      )
      .subscribe();
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): void {
    this.http.post<{ token: string }>(`${environment.apiUrl}/api/user/login`,{ email, password },this.httpOptions
    )
    //metodo per ricavare diversi parametri per elaborare la risposta
    .pipe(
      //prende solo il primo risultato corrispondente senza fare altri controlli
      first(),
      //estrae il token
      map(tokenObject => tokenObject.token),
      //utilizzata per fare operazioni aggiuntive in parallelo
      tap(token => {
        //setta il token estratto nel localstorage
        localStorage.setItem(this.JWT_TOKEN, token);
        //rinvia l'utente alla pagina home
        this.router.navigate(['/home']);
      }),
      catchError(this.errorHandlerService.handleError<string>("login"))).subscribe();
  }

  getCurrentUser(): User | null {
    let token = localStorage.getItem(this.JWT_TOKEN);
    if(token){
      let decodedToken = this.jwtHelper.decodeToken(token);
      return new User(decodedToken.Id, decodedToken.Name, decodedToken.Surname,
        decodedToken.Email, decodedToken.IsAdmin);
    }
    return null;
  }

 isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN) && !this.isTokenExpired();
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const token: string | null = localStorage.getItem(this.JWT_TOKEN);
    if (!token) {
      return true;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      return true;
    }
    return false;
  }

  isAdmin(){
    return !!this.getCurrentUser()?.isAdmin;
  }



}
