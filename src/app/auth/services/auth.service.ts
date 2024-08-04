import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from '../models/auth-data.model';
import { TrainingService } from '../../training/services/training.service';
import { LoadingService } from '../../shared/loading.service';
import { NotificationService } from '../../shared/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  isLoggedIn = signal<boolean>(false);

  private fireAuth = inject(Auth);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private trainingService = inject(TrainingService);
  private loadingService = inject(LoadingService);
  private notificationService = inject(NotificationService);

  registerUser(authData: AuthData): void {
    const { email, password } = authData;

    if (!email || !password) {
      return;
    }

    this.loadingService.toggleLoading(true);

    createUserWithEmailAndPassword(
      this.fireAuth,
      authData.email,
      authData.password
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        console.log(error.name);

        this.notificationService.showSnackBar(error.message, null, 3000);
      })
      .finally(() => this.loadingService.toggleLoading(false));
  }

  login(authData: AuthData): void {
    const { email, password } = authData;

    if (!email || !password) {
      return;
    }

    this.loadingService.toggleLoading(true);

    signInWithEmailAndPassword(this.fireAuth, authData.email, authData.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        console.log(error.name);

        this.notificationService.showSnackBar(error.message, null, 3000);
      })
      .finally(() => this.loadingService.toggleLoading(false));
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  initAuthListener(): void {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.isLoggedIn.set(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
      }
    });
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
