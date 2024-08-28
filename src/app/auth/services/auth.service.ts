import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { AuthData } from '../models/auth-data.model';
import { TrainingService } from '../../training/services/training.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AppGlobalStore } from '../../shared/store/app-global.store';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fireAuth = inject(Auth);
  private router = inject(Router);
  private trainingService = inject(TrainingService);
  private notificationService = inject(NotificationService);
  private appGlobalStore = inject(AppGlobalStore);
  private authStore = inject(AuthStore);

  registerUser(authData: AuthData): void {
    const { email, password } = authData;

    if (!email || !password) {
      return;
    }

    this.appGlobalStore.startLoading();

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
      .finally(() => this.appGlobalStore.stopLoading());
  }

  login(authData: AuthData): void {
    const { email, password } = authData;

    if (!email || !password) {
      return;
    }

    this.appGlobalStore.startLoading();

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
      .finally(() => this.appGlobalStore.stopLoading());
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  initAuthListener(): void {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authStore.setAuthenticated();
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authStore.setUnauthenticated();
        this.router.navigate(['/login']);
      }
    });
  }
}
