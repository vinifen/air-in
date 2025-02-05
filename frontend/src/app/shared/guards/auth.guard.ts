import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserSessionHandlerService } from '../services/user-session-handler.service';
import { InitializeService } from '../services/initialize.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const initializeService = inject(InitializeService)
  const userSession = inject(UserSessionHandlerService);
  const router = inject(Router);
  
  const isInitialized = await firstValueFrom(initializeService.getIsInitialized());

  if (!isInitialized) {
   
    const checkUser = await userSession.checkUserSession();
    
    if (!checkUser.stStatus) {
      return true; 
    }
    return router.parseUrl('/'); 
  }

  const isLogged = await firstValueFrom(authService.getIsLogged());
  if (!isLogged) {
    return true; 
  }
  return false; 
};
