import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from './api.service';
import { InsightStateService } from './insight-state.service';
import { QuestionForm } from './question-form';
import { InsightSummary } from './insight-summary';
import { DataPreviewTable } from './data-preview-table';
import { RecommendationsList } from './recommendations-list';
import { ActionsAccordion } from './actions-accordion';

@Component({
  selector: 'ti-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    QuestionForm,
    InsightSummary,
    DataPreviewTable,
    RecommendationsList,
    ActionsAccordion,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly apiService = inject(ApiService);
  readonly state = inject(InsightStateService);

  readonly currentYear = new Date().getFullYear();

  onAskQuestion(question: string): void {
    this.state.setLoading(true);

    this.apiService.askQuestion(question).subscribe({
      next: (data) => {
        this.state.setInsightData(question, data);
      },
      error: (err) => {
        this.state.setError({ message: err.message || 'Something went wrong' });
      },
    });
  }
}
