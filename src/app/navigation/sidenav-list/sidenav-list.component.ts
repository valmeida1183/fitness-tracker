import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStore } from '../../auth/store/auth.store';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent {
  closeSidenav = output<void>();

  private authService = inject(AuthService);
  private authStore = inject(AuthStore);

  isAuthenticated = this.authStore.isAuthenticated;

  onLogout(): void {
    this.authService.logout();
    this.closeSidenav.emit();
  }

  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }
}
