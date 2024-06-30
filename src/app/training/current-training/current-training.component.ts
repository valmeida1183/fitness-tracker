import { Component, OnInit, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';

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
  trainingExit = output<void>();

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;

      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startTimer();
      }
    });
  }
}
