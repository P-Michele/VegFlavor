import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser!: { name: string; id: string;surname:string; email:string; isAdmin:boolean };

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('JWT_TOKEN'); 
    if (token) {
      this.currentUser = this.loginService.getCurrentUser(token);
    }
  }
}
