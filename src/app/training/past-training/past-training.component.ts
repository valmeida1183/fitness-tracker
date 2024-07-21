import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Exercise } from './models/exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-past-training',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FlexLayoutModule,
    DatePipe,
  ],
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
  paginator = viewChild<MatPaginator>(MatPaginator);

  private trainingService = inject(TrainingService);

  constructor() {
    // Se usar effect ou ngAfterViewInit é o mesmo resultado.
    effect(() => {
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.paginator = this.paginator() ?? null;
    });

    effect(() => {
      const finishedExercises =
        this.trainingService.finishedExercisesListSignal() ?? [];
      this.dataSource.data = finishedExercises;
    });
  }

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort() ?? null;
    //this.dataSource.paginator = this.paginator() ?? null;
  }

  onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
