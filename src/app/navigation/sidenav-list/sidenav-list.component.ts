import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent {
  closeSidenav = output<void>();

  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }
}
