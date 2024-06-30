import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FlexLayoutModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {}
