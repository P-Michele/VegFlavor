import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginService } from './services/login.service';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginService] 
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path:"register",
    component: RegisterComponent,
    canActivate: [LoginService] 
  },
  {
    path: "recipes",
    component: RecipesComponent
  },
  {
    path: 'recipeDetails/:id',
    component: RecipeDetailsComponent
  },
  { path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
