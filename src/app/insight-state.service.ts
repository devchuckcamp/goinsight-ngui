import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AskResponse } from './models';

interface InsightState {
  currentQuestion: string | null;
  lastResponse: AskResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: InsightState = {
  currentQuestion: null,
  lastResponse: null,
  loading: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class InsightStateService {
  private state$ = new BehaviorSubject<InsightState>(initialState);

  readonly currentQuestion$ = new BehaviorSubject<string | null>(null);
  readonly lastResponse$ = new BehaviorSubject<AskResponse | null>(null);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
    if (loading) {
      this.error$.next(null);
    }
  }

  setError(error: string | null): void {
    this.error$.next(error);
    this.loading$.next(false);
  }

  setInsightData(question: string, response: AskResponse): void {
    this.currentQuestion$.next(question);
    this.lastResponse$.next(response);
    this.loading$.next(false);
    this.error$.next(null);
  }

  reset(): void {
    this.currentQuestion$.next(null);
    this.lastResponse$.next(null);
    this.loading$.next(false);
    this.error$.next(null);
  }
}
