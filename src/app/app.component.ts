import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './navigation/header/header.component';
import { RouterOutlet } from '@angular/router';

import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidenavListComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fitness-tracker';
}
