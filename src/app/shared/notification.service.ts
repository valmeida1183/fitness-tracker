import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackbar = inject(MatSnackBar);

  showSnackBar(
    message: string,
    action?: string | null,
    duration?: number
  ): void {
    duration = duration ?? 3000;
    action = action ?? undefined;

    this.snackbar.open(message, action, { duration: duration });
  }
}
