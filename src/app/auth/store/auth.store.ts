import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setAuthenticated(): void {
      patchState(store, { isAuthenticated: true });
    },
    setUnauthenticated(): void {
      patchState(store, { isAuthenticated: false });
    },
  }))
);
