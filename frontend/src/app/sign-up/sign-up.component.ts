
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
  
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private loginService: LoginService){}
  
  ngOnInit(): void {
    this.signupForm= this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      name:new FormControl("",[Validators.required,Validators.minLength(2)]),
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(7)])
    })
  }

  signup():void {
    this.loginService
    .signup(this.signupForm.value)
      .subscribe((msg)=>console.log(msg));
  }
}
