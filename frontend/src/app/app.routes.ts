import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ResearchComponent } from './research/research.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipeDetails/recipeDetails.component';
import { SignupComponent } from './signup/signup.component';

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
        component: SignupComponent
    },
    {
        path: "*",
        redirectTo: "home",
        pathMatch: "full"
    }
];
