import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo/profilo.component';
import { LoginComponent } from './login/login.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { HomeComponent } from './home/home.component';
import { DettagliRicettaComponent } from './dettagli-ricetta/dettagli-ricetta.component';
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
        path: "profilo",
        component: ProfiloComponent
    },
    {
        path: "ricerca",
        component: RicercaComponent
    },
    {
        path: "dettagli",
        component: DettagliRicettaComponent
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