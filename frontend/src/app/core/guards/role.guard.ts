import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../auth/auth.service';


export const roleGuard: CanActivateFn =
  (route) => {

    const authService =
      inject(AuthService);

    const router =
      inject(Router);


    if (!authService.isAuthenticated()) {

      return router.createUrlTree([
        '/login'
      ]);
    }


    const allowedRoles =
      route.data['roles'] as string[];


    if (
      !allowedRoles ||
      allowedRoles.length === 0
    ) {

      return true;
    }


    const userRole =
      authService.role();


    if (
      userRole &&
      allowedRoles.includes(userRole)
    ) {

      return true;
    }


    return router.createUrlTree([
      '/'
    ]);
  };
