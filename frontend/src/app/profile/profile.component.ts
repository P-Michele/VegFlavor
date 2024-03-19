
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
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

  currentUser: User = new User(-1, '', '', '');
  selectedFile!: File;
  maxFileSize = 5 * 1024 * 1024; // 5MB for image size upload

  constructor(private loginService: AuthService,
    private ProfileService : ProfileService) { }

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user !== null) {
      this.currentUser = user;
    }
  }

  saveChange() {
    if(this.currentUser.name != null || this.currentUser.surname != null || this.currentUser.email != null){
      this.ProfileService.uploadProfileInfo( this.currentUser.name, this.currentUser.surname, this.currentUser.email).subscribe(
        (response) => {
          alert('I tuoi dati sono stati aggiornati correttamente');
    });
    }
    else{
      alert('Compila tutti i campi per salvare le modifiche');
    }
  }

}
