import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'authentication',
    component: AuthComponent,
    canActivate: [authGuard] 
  },
  {
    path: '**',
    redirectTo: '', 
    pathMatch: 'full'
  }
];
