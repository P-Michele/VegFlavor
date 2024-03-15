import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  currentUser!: { name: string; id: string; surname: string; email: string; isAdmin: boolean };

  selectedFile!: File;
  maxFileSize = 5 * 1024 * 1024; // 5MB for image size upload

  constructor(private loginService: LoginService, 
    private ProfileService : ProfileService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      this.currentUser = this.loginService.getCurrentUser(token);
    }
  }

  openFileUploader() {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;

    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Il file che stai caricando non è un\'immagine. Riprova con un formato valido.');
      event.target.value = '';
      return;
    }

    if (file.size > this.maxFileSize) {
      alert('Il file che stai caricando supera i 5MB consentiti. Riprova con un file più piccolo.');
      event.target.value = '';
      return;
    }
    this.selectedFile = file;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = document.getElementById('profileImage') as HTMLImageElement;
        img.src = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
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
