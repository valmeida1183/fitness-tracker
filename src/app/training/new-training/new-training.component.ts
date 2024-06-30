import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent {
  trainingStart = output<void>();

  onStartTraining(): void {
    this.trainingStart.emit();
  }
}
