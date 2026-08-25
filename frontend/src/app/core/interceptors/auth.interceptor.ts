import { inject } from '@angular/core';

import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  AuthService
} from '../auth/auth.service';


export const authInterceptor: HttpInterceptorFn =
  (request, next) => {

    const authService =
      inject(AuthService);


    // Ne jamais envoyer un JWT sur login/register
    if (
      request.url.includes('/api/auth/')
    ) {
      return next(request);
    }


    const token =
      authService.getToken();


    if (!token) {
      return next(request);
    }


    const authenticatedRequest =
      request.clone({

        setHeaders: {
          Authorization:
            `Bearer ${token}`
        }

      });


    return next(
      authenticatedRequest
    );
  };
