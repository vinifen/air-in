import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, from, switchMap, tap, finalize } from 'rxjs';
import { inject } from '@angular/core';
import { UserSessionHandlerService } from '../services/user-session-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicRoutes = [
    { url: '/authentication', methods: ['POST', 'GET'] },
    { url: '/cities-weather/public', methods: ['POST'] },
    { url: '/auth/logout', methods: ['POST'] },
    { url: '/auth/refresh-token', methods: ['POST'] },
  ];
  const spinner = inject(NgxSpinnerService);
  spinner.show();

  const isPublicRoute = publicRoutes.some(
    (route) => req.url.includes(route.url) && route.methods.includes(req.method)
  );

  if (isPublicRoute) {
    return next(req).pipe(finalize(() => {
      spinner.hide();
    }));
  }

  const userSessionHandler = inject(UserSessionHandlerService);

  return next(req).pipe(
    switchMap((response: any) => {
      const responseBody = response.body;

      if (responseBody?.status === false && responseBody.data?.stStatus === false && responseBody.data?.hasRt === true) {

        return from(userSessionHandler.handlerErrorRequest(responseBody)).pipe(
          switchMap((resultAuth: any) => {
            if (resultAuth.status === true && resultAuth.newSession === true) {

              const requestAgain = req.clone();
              return next(requestAgain);
            } else {

              console.error('Session expired or token renewal failed');
              return throwError(() => new Error('Session expired or token renewal failed'));
            }
          })
        );
      }
      return from(Promise.resolve(response)); 
    }),
    catchError((error) => {
      console.error('Error caught in the interceptor:', error);
      return throwError(() => error);
    }),
    finalize(() => {
      spinner.hide();
    })
  );
  
};
