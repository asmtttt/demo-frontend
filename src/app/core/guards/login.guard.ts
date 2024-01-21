import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(TokenService).isAuthenticated() //TODO Local Storage Temizlenecek Authenticated Değilse
    ? inject(Router).createUrlTree(['/'])
    : true;
};
