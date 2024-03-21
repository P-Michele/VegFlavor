
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  currentUser ?: User;

  constructor(private loginService: AuthService) { }

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user !== null) {
      this.currentUser = user;
    }
  }

}
