import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: "login", 
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/login/login.component")
                .then(c => c.LoginComponent)
        }},
    {
        path: "cadastro",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/cadastro/cadastro.component")
                .then(c => c.CadastroComponent)
        }
    },
    {
        path: "home",
        pathMatch: "full",
        canActivate: [loginGuard],
        loadComponent: () => {
            return import("./pages/home/home.component")
                .then(c => c.HomeComponent)
        }
    },
    {
        path: "dashboard",
        pathMatch: "full",
        canActivate: [loginGuard],
        loadComponent: () => {
            return import("./pages/dashboard/dashboard.component")
                .then(c => c.DashboardComponent)
        }
    },
    {
        path: "contato",
        pathMatch: "full",
        canActivate: [loginGuard],
        loadComponent: () => {
            return import("./pages/contato/contato.component")
                .then(c => c.ContatoComponent)
        }
    }


];
