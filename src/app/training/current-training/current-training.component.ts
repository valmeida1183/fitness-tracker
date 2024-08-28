import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../services/training.service';
import { TrainingStore } from '../store/training.store';
import { Exercise } from '../past-training/models/exercise.model';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, FlexLayoutModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss',
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer!: any;

  private dialog = inject(MatDialog);
  private trainingService = inject(TrainingService);
  private trainingStore = inject(TrainingStore);

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    const { duration } = this.trainingStore.runningExercise() as Exercise;
    const step = (duration / 100) * 1000;

    this.timer = setInterval(() => {
      this.progress = this.progress + 5;

      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startTimer();
      }
    });
  }
}
