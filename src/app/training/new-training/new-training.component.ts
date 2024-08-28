import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TrainingService } from '../services/training.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppGlobalStore } from '../../shared/store/app-global.store';
import { TrainingStore } from '../store/training.store';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private trainingService = inject(TrainingService);
  private trainingStore = inject(TrainingStore);
  private appGlobalStore = inject(AppGlobalStore);

  availableExercisesList = this.trainingStore.availableExercises;
  isLoadingSignal = this.appGlobalStore.isLoading;
  showReloadExercisesList = this.trainingStore.showReloadExercises;

  //TODO make this a typed form
  form: FormGroup = this.formBuilder.group({
    exercise: ['', Validators.required],
  });

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onFetchExercisesAgain(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(): void {
    const { exercise: selectedId } = this.form.value;

    if (selectedId) {
      this.trainingService.startExercise(selectedId);
    }
  }
}
