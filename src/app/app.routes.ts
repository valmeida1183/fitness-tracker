import { Routes } from '@angular/router';
import { lazyAuthRoutes } from './auth/auth.routes';
import { lazyTrainingRoutes } from './training/training.routes';

// export const routes: Routes = [
//   { path: '', component: WelcomeComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'training', component: TrainingComponent, canActivate: [authGuard] },
// ];

// LazyLoad standalone components!
export const lazyRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./welcome/welcome.component').then((x) => x.WelcomeComponent),
  },
  ...lazyAuthRoutes,
  ...lazyTrainingRoutes,
];
