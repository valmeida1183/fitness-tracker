import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  return navigateIfAuthenticated();
};

export const authMatchGuard: CanMatchFn = (route, state) => {
  return navigateIfAuthenticated();
};

const navigateIfAuthenticated = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = authStore.isAuthenticated();
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
