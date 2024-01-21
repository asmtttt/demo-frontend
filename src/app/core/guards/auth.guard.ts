import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(TokenService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
};
