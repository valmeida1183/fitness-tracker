import { Injectable, computed, inject, signal } from '@angular/core';
import { Exercise } from '../past-training/models/exercise.model';
import {
  addDoc,
  collection,
  collectionChanges,
  DocumentChange,
  DocumentData,
  Firestore,
  Timestamp,
} from '@angular/fire/firestore';
import { finalize, map, Subscription } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { AppGlobalStore } from '../../shared/store/app-global.store';
import { TrainingStore } from '../store/training.store';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private firestore = inject(Firestore);
  private appGlobalStore = inject(AppGlobalStore);
  private trainingStore = inject(TrainingStore);
  private notificationService = inject(NotificationService);

  private serviceSubscription = new Subscription();

  cancelSubscriptions(): void {
    console.log('cancelSubscriptions  was called!!!');
    this.serviceSubscription.unsubscribe();
  }

  fetchAvailableExercises(): void {
    const availableExercisesCollection = collection(
      this.firestore,
      'availableExercises'
    );

    this.appGlobalStore.startLoading();
    const subscription = collectionChanges(availableExercisesCollection)
      .pipe(
        map((docArray) => {
          return docArray.map(this.convertDocChangeToExercise);
        }),
        finalize(() => this.appGlobalStore.stopLoading())
      )
      .subscribe({
        next: (exercises: Exercise[]) => {
          this.trainingStore.setAvailableExercises(exercises);
          this.trainingStore.setShowReloadExercises(false);
          this.appGlobalStore.stopLoading();
        },
        error: (_) => {
          const errorHandledMsg =
            'Fetching Exercises failed, please try again later';
          this.notificationService.showSnackBar(errorHandledMsg);
          this.trainingStore.setShowReloadExercises(true);
          this.appGlobalStore.stopLoading();
        },
      });

    this.serviceSubscription.add(subscription);
  }

  fetchCompletedOrCanceledExercises(): void {
    const finishedExercisesCollection = collection(
      this.firestore,
      'finishedExercises'
    );

    const subscription = collectionChanges(finishedExercisesCollection)
      .pipe(
        map((docArray) => {
          return docArray.map((docChanged) => {
            return docChanged.type !== 'removed'
              ? this.convertDocChangeToExercise(docChanged)
              : ({} as Exercise);
          });
        })
      )
      .subscribe({
        next: (exercises: Exercise[]) => {
          this.mergeFinishedExercises(exercises);
        },
      });

    this.serviceSubscription.add(subscription);
  }

  startExercise(selectedId: string): void {
    // Exemplo de update
    // const ref = doc(this.firestore, `availableExercises/${selectedId}`);
    // updateDoc(ref, {})

    const selectedExercise = this.trainingStore
      .availableExercises()
      .find((exercise) => exercise.id === selectedId);

    if (selectedExercise) {
      this.trainingStore.startExercise(selectedExercise);
    }
  }

  completeExercise(): void {
    const runningExercise = this.trainingStore.runningExercise();
    if (!runningExercise) {
      return;
    }

    this.addDataToDatabase({
      ...runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.trainingStore.stopExercise();
  }

  cancelExercise(progress: number): void {
    const runningExercise = this.trainingStore.runningExercise();
    if (!runningExercise) {
      return;
    }

    this.addDataToDatabase({
      ...runningExercise,
      duration: runningExercise.duration * (progress / 100),
      calories: runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.trainingStore.stopExercise();
  }

  private addDataToDatabase(exercise: Exercise): void {
    const finishedExercisesCollection = collection(
      this.firestore,
      'finishedExercises'
    );

    addDoc(finishedExercisesCollection, exercise);
  }

  private convertDocChangeToExercise(
    docChange: DocumentChange<DocumentData, DocumentData>
  ): Exercise {
    const id = docChange.doc.id;
    const data = docChange.doc.data();
    const { date } = data;

    return {
      ...data,
      id,
      date: date instanceof Timestamp ? date.toDate() : undefined,
    } as Exercise;
  }

  private mergeFinishedExercises(exercises: Exercise[]) {
    const finishedExercisesMap = new Map<string, Exercise>();
    const currentFinishedExercises = this.trainingStore.finishedExercises();

    currentFinishedExercises.forEach((exercise) =>
      finishedExercisesMap.set(exercise.id, exercise)
    );

    exercises.forEach((exercise) =>
      finishedExercisesMap.set(exercise.id, exercise)
    );

    const mergedFinishedExercises = Array.from(finishedExercisesMap.values());
    this.trainingStore.setFinishedExercises(mergedFinishedExercises);
  }
}
