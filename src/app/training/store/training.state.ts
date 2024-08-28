import { Exercise } from '../past-training/models/exercise.model';

export type TrainingState = {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  runningExercise: Exercise | null;
  showReloadExercises: boolean;
};
