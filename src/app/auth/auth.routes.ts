import { Routes } from '@angular/router';

export const lazyAuthRoutes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((x) => x.SignupComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((x) => x.LoginComponent),
  },
];
