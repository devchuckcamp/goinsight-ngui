import { Injectable, signal, computed } from '@angular/core';
import { AskResponse, ApiError, JiraTicket } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class InsightStateService {
  // Data state
  readonly currentQuestion = signal<string | null>(null);
  readonly lastResponse = signal<AskResponse | null>(null);

  // UI state
  readonly loading = signal(false);
  readonly error = signal<ApiError | null>(null);

  // JIRA state
  readonly selectedActionIndices = signal<number[]>([]);
  readonly creatingJiraTickets = signal(false);
  readonly jiraTicketsCreated = signal<JiraTicket[]>([]);
  readonly jiraError = signal<ApiError | null>(null);

  // Computed
  readonly hasResponse = computed(() => this.lastResponse() !== null && this.currentQuestion() !== null);
  readonly hasSelectedActions = computed(() => this.selectedActionIndices().length > 0);

  // Data actions
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
    this.selectedActionIndices.set([]);
    this.jiraTicketsCreated.set([]);
  }

  clearError(): void {
    this.error.set(null);
  }

  reset(): void {
    this.currentQuestion.set(null);
    this.lastResponse.set(null);
    this.loading.set(false);
    this.error.set(null);
    this.selectedActionIndices.set([]);
    this.creatingJiraTickets.set(false);
    this.jiraTicketsCreated.set([]);
    this.jiraError.set(null);
  }

  // JIRA actions
  toggleActionSelection(index: number): void {
    this.selectedActionIndices.update((indices) => {
      const isSelected = indices.includes(index);
      return isSelected ? indices.filter((i) => i !== index) : [...indices, index];
    });
  }

  clearActionSelection(): void {
    this.selectedActionIndices.set([]);
  }

  setCreatingJiraTickets(loading: boolean): void {
    this.creatingJiraTickets.set(loading);
    this.jiraError.set(null);
  }

  setJiraTicketsCreated(tickets: JiraTicket[]): void {
    this.jiraTicketsCreated.set(tickets);
    this.creatingJiraTickets.set(false);
    this.selectedActionIndices.set([]);
    this.jiraError.set(null);
  }

  setJiraError(error: ApiError | null): void {
    this.jiraError.set(error);
    this.creatingJiraTickets.set(false);
  }

  clearJiraError(): void {
    this.jiraError.set(null);
  }

  removeCreatedActions(indicesToRemove: number[]): void {
    const current = this.lastResponse();
    if (!current) return;

    const newActions = current.actions.filter((_, idx) => !indicesToRemove.includes(idx));
    this.lastResponse.set({ ...current, actions: newActions });
  }

  clearJiraTickets(): void {
    this.jiraTicketsCreated.set([]);
  }
}
