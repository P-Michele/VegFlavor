import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import {authGuardService} from "./services/authGuard.service";

export const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [authGuardService],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuardService],
  },
  {
    path:"register",
    component: RegisterComponent,
    canActivate: [authGuardService]
  },
  {
    path: "recipes",
    component: RecipesComponent
  },
  {
    path: 'recipeDetails/:id',
    component: RecipeDetailsComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];
