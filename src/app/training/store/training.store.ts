import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TrainingState } from './training.state';
import { Exercise } from '../past-training/models/exercise.model';
import { computed } from '@angular/core';

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  runningExercise: null,
  showReloadExercises: false,
};

export const TrainingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    return {
      ongoingTraining: computed(() => (store.runningExercise() ? true : false)),
    };
  }),
  withMethods((store) => ({
    setAvailableExercises(exercises: Exercise[]): void {
      patchState(store, { availableExercises: exercises });
    },
    setFinishedExercises(exercises: Exercise[]): void {
      patchState(store, { finishedExercises: exercises });
    },
    startExercise(exercise: Exercise): void {
      patchState(store, { runningExercise: exercise });
    },
    stopExercise(): void {
      patchState(store, { runningExercise: null });
    },
    setShowReloadExercises(showReloadExercises: boolean): void {
      patchState(store, { showReloadExercises });
    },
  }))
);
