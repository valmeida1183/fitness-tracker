import { Injectable, Injector, computed, inject, signal } from '@angular/core';
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
import { map, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly runningExerciseSignal = signal<Exercise | undefined>(
    undefined
  );
  private finishedExercises = signal<Exercise[]>([]);
  private availableExercises = signal<Exercise[]>([]);
  private runningExercise: Exercise | undefined;

  exerciseChangedSignal = computed<Exercise | undefined>(() =>
    this.runningExerciseSignal()
  );

  finishedExercisesListSignal = computed<Exercise[] | undefined>(() =>
    this.finishedExercises()
  );

  availableExercisesListSignal = computed<Exercise[] | undefined>(() =>
    this.availableExercises()
  );

  ongoingTrainingSignal = computed<boolean>(() => {
    return this.runningExerciseSignal() ? true : false;
  });

  private serviceSubscription = new Subscription();

  private firestore = inject(Firestore);
  private injector = inject(Injector);

  cancelSubscriptions(): void {
    console.log('cancelSubscriptions  was called!!!');
    this.serviceSubscription.unsubscribe();
  }

  fetchAvailableExercises(): void {
    const availableExercisesCollection = collection(
      this.firestore,
      'availableExercises'
    );

    const subscription = collectionChanges(availableExercisesCollection)
      .pipe(
        map((docArray) => {
          return docArray.map(this.convertDocChangeToExercise);
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises.set(exercises);
      });

    this.serviceSubscription.add(subscription);
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise } as Exercise;
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
          this.finishedExercises.set(exercises);
        },
      });

    this.serviceSubscription.add(subscription);
  }

  startExercise(selectedId: string): void {
    // Exemplo de update
    // const ref = doc(this.firestore, `availableExercises/${selectedId}`);
    // updateDoc(ref, {})

    const selectedExercise = this.availableExercises()?.find(
      (ex) => ex.id === selectedId
    );

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.runningExerciseSignal.set({ ...this.runningExercise });
    }
  }

  completeExercise(): void {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
      this.runningExercise = undefined;
      this.runningExerciseSignal.set(undefined);
    }
  }

  cancelExercise(progress: number): void {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.runningExercise = undefined;
      this.runningExerciseSignal.set(undefined);
    }
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
      id,
      ...data,
      date: date instanceof Timestamp ? date.toDate() : undefined,
    } as Exercise;
  }
}
