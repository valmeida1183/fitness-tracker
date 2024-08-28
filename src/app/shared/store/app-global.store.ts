import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AppGlobalState } from './app-global.state';

const initialState: AppGlobalState = {
  isLoading: false,
};

export const AppGlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    startLoading(): void {
      patchState(store, { isLoading: true });
    },
    stopLoading(): void {
      patchState(store, { isLoading: false });
    },
  }))
);
