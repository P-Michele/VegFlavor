import { Component,OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule,MatInputModule,CommonModule],
  styleUrls: ['./login.component.scss'],
 
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private loginService: LoginService){}
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
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe();
  }
}
