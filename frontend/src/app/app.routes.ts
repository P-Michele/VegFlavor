import {  Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { ResearchComponent } from './research/research.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipeDetails/recipeDetails.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


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
        path: "research",
        component: ResearchComponent
    },
    {
        path: "dettagli",
        component: RecipeDetailsComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "*",
        redirectTo: "home",
        pathMatch: "full"
    }
];
