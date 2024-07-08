import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TrainingService } from '../services/training.service';
import { Exercise } from '../past-training/models/exercise.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  private trainingService = inject(TrainingService);
  private formBuilder = inject(FormBuilder);

  //TODO make this a typed form
  form: FormGroup = this.formBuilder.group({
    exercise: ['', Validators.required],
  });

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(): void {
    const { exercise: selectedId } = this.form.value;

    if (selectedId) {
      this.trainingService.startExercise(selectedId);
    }
  }
}
