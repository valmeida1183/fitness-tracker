import { Injectable, computed, signal } from '@angular/core';
import { Exercise } from '../past-training/models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private runningExercise: Exercise | null = null;
  private readonly runningExerciseSignal = signal<Exercise | null>(null);
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private exercises: Exercise[] = [];

  exerciseChangedSignal = computed<Exercise | null>(() =>
    this.runningExerciseSignal()
  );

  ongoingTrainingSignal = computed<boolean>(() => {
    return this.runningExerciseSignal() ? true : false;
  });

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise } as Exercise;
  }

  getCompletedOrCanceledExercises() {
    return this.exercises.slice();
  }

  startExercise(selectedId: string): void {
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.runningExerciseSignal.set({ ...this.runningExercise });
    }
  }

  completeExercise(): void {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
      this.runningExercise = null;
      this.runningExerciseSignal.set(null);
    }
  }

  cancelExercise(progress: number): void {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.runningExercise = null;
      this.runningExerciseSignal.set(null);
    }
  }
}
