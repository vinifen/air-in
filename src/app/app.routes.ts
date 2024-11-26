import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthenticationComponent } from './components/pages/authentication/authentication.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'authentication',
    component: AuthenticationComponent
  },
];
