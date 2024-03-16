
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'

})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.registerForm= this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      name:new FormControl("",[Validators.required,Validators.minLength(2)]),
      surname: new FormControl("",[Validators.required,Validators.minLength(2)]),
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(7)])
    })
  }

  register(): void {
    this.authService.register(this.registerForm.value);
  }
}
