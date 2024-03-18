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
      this.router.navigate(['/home']);
    }),
    catchError(this.errorHandlerService.handleError<string>("login"))
  );
}
  getCurrentUser(): User | null {
    let token = localStorage.getItem(this.JWT_TOKEN);
    if(token){
      let decodedToken = this.jwtHelper.decodeToken(token);
      return new User(decodedToken.Id, decodedToken.Name, decodedToken.Surname, decodedToken.Email);
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
      // Il token non è presente, quindi l'utente non è autenticato
      this.router.navigate(['/login']);
      return true;
    }

    // Verifica se il token è scaduto
    const isExpired = this.jwtHelper.isTokenExpired(token);

    if (isExpired) {
      // Se il token è scaduto, reindirizza l'utente alla pagina di login
      this.router.navigate(['/login']);
      return true;
    }

    return false;
  }

}
