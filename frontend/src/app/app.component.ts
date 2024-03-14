import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend2';

  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
  
}
