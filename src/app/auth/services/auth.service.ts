import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  isLoggedIn = signal<boolean>(false);

  private router = inject(Router);

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authenticatedSuccessfully();
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authenticatedSuccessfully();
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return { ...this.user } as User;
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private authenticatedSuccessfully(): void {
    this.isLoggedIn.set(true);
    this.router.navigate(['/training']);
  }
}
