import { Routes } from '@angular/router';
import { authGuard, authMatchGuard } from '../auth/guards/auth.guard';
import { TrainingStore } from './store/training.store';

export const lazyTrainingRoutes: Routes = [
  {
    path: 'training',
    loadComponent: () =>
      import('./training.component').then((x) => x.TrainingComponent),
    canMatch: [authMatchGuard],
  },
];
