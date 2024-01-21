import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(TokenService).isAuthenticated()
    ? inject(Router).createUrlTree(['/'])
    : false;
};
