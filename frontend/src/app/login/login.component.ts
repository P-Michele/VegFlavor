
import { AuthService } from '../services/auth.service';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private loginService: AuthService){}
  ngOnInit(): void {
    this.loginForm= this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[
        Validators.required,
        Validators.minLength(7)])
    })
  }

  login(): void {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
