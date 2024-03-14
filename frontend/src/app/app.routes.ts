import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  { path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
