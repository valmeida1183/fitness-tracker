import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const authMatchGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
