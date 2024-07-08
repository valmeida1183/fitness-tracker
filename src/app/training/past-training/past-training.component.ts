import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

import { Exercise } from './models/exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-past-training',
  standalone: true,
  imports: [MatTableModule, MatSortModule, DatePipe],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.scss',
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();
  sort = viewChild<MatSort>(MatSort);

  private trainingService = inject(TrainingService);

  constructor() {
    // Se usar effect ou ngAfterViewInit é tem o mesmo resultado.
    effect(() => {
      this.dataSource.sort = this.sort() ?? null;
    });
  }

  ngOnInit(): void {
    this.dataSource.data =
      this.trainingService.getCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort() ?? null;
  }
}
