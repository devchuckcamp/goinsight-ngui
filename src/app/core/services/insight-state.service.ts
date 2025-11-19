import { Injectable, signal, computed } from '@angular/core';
import { AskResponse, ApiError } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class InsightStateService {
  // Data state
  readonly currentQuestion = signal<string | null>(null);
  readonly lastResponse = signal<AskResponse | null>(null);

  // UI state
  readonly loading = signal(false);
  readonly error = signal<ApiError | null>(null);

  // Computed
  readonly hasResponse = computed(() => this.lastResponse() !== null && this.currentQuestion() !== null);

  setLoading(loading: boolean): void {
    this.loading.set(loading);
    this.error.set(null);
  }

  setError(error: ApiError | null): void {
    this.error.set(error);
    this.loading.set(false);
  }

  setInsightData(question: string, response: AskResponse): void {
    this.currentQuestion.set(question);
    this.lastResponse.set(response);
    this.loading.set(false);
    this.error.set(null);
  }

  clearError(): void {
    this.error.set(null);
  }

  reset(): void {
    this.currentQuestion.set(null);
    this.lastResponse.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
}
