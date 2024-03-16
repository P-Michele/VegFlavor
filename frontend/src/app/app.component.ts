import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend2';

  constructor(private loginService: AuthService) {}

  logout(): void {
    this.loginService.logout();
  }
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

}
