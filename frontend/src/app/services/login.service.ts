import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of} from 'rxjs';
import {first,catchError,tap, map} from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
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

  register(user: Omit<User, 'id'>): void {
    this.http.post<{ token: string }>(`${environment.apiUrl}/api/user/register`, user, this.httpOptions)
      .pipe(
        first(),
        tap(tokenObject => {
          const token = tokenObject.token;
          localStorage.setItem(this.JWT_TOKEN, token);
          this.loggedUser.next(true);
          this.router.navigate(['/home']);
        }),
        catchError(this.errorHandlerService.handleError<void>('register'))
      )
      .subscribe();
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
  getCurrentUser(token:string): { name: string, id: number,surname:string,email:string,isAdmin:boolean } {
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

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      // Se l'utente è già autenticato, reindirizza a un'altra rotta
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.loggedUser.next(false);
    this.router.navigate(['/login']);
  }

  isTokenExpired() {
    const tokenIsPresent = localStorage.getItem(this.JWT_TOKEN);
    //se il token non esiste ritorna true e viene reindirizzato alla login 
    if (!tokenIsPresent) {
      this.router.navigate(['/login']);
      return true;
    }
    //altrimenti prende il token 
    const token = JSON.parse(tokenIsPresent).access_token;
    //il token viene decodificato 
    const decoded = this.jwtHelper.decodeToken(token);
    //verifica se c'è il campo exp, se questo non esiste torna true perchè significa che è scaduto e 
    //viene indirizzato alla pagina login  
    if (!decoded.exp){
      this.router.navigate(['/login']);
      return true;
    }
    //controlla se exp è precedente alla data corrente e in caso affermativo ritorna true perchè è scaduto il token
    //e viene reindirizzato alla login 
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();
    if(expirationDate < now){
       this.router.navigate(['/login']);
       return true;
    }
    //in caso fosse ancora valido restituisce false
   return false;
    
  }

}
