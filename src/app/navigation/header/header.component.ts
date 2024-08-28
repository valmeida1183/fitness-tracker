import { Component, inject, OnInit, output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStore } from '../../auth/store/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sidenavToggle = output<void>();

  private authService = inject(AuthService);
  private authStore = inject(AuthStore);

  isAuthenticated = this.authStore.isAuthenticated;

  onLogout(): void {
    this.authService.logout();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
