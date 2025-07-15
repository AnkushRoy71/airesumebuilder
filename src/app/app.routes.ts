import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Userform } from './userform/userform';
import { AuthGuard } from '@auth0/auth0-angular';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: '',
        component : Home
    },
    {
        path:'resume',
        component: Userform,
        canActivate: [AuthGuard]
    }
];
