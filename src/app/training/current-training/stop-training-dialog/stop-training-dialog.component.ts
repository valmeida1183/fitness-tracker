import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { StopTrainingDialogData } from './interface/stop-training-dialog-data.interface';

@Component({
  selector: 'app-stop-training-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './stop-training-dialog.component.html',
  styleUrl: './stop-training-dialog.component.scss',
})
export class StopTrainingDialogComponent {
  //readonly dialogRef = inject(MatDialogRef<StopTrainingDialogComponent>);
  readonly passedData = inject<StopTrainingDialogData>(MAT_DIALOG_DATA);
}
