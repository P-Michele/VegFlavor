import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthService } from './services/auth.service';
import {NotFoundComponent} from "./not-found/not-found.component";
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path:"register",
    component: RegisterComponent,
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
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];
