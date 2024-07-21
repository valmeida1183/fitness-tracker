import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = signal<boolean>(false);
  isLoading = computed(() => {
    return this.loading();
  });

  toggleLoading(value: boolean): void {
    this.loading.set(value);
  }
}
