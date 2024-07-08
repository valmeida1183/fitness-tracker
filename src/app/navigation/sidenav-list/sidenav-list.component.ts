import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent {
  closeSidenav = output<void>();
  authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
    this.closeSidenav.emit();
  }

  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }
}
