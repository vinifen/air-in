import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthComponent } from './components/pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'authentication',
    component: AuthComponent
  },
];
