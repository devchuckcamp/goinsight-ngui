import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppLayout } from './core/layout/app-layout/app-layout';
import { GoinsightApiService } from './core/services/goinsight-api.service';
import { InsightStateService } from './core/services/insight-state.service';
import {
  QuestionForm,
  InsightSummary,
  DataPreviewTable,
  RecommendationsList,
  ActionsAccordion,
} from './features/ask';

@Component({
  selector: 'ti-root',
  imports: [
    MatProgressSpinnerModule,
    AppLayout,
    QuestionForm,
    InsightSummary,
    DataPreviewTable,
    RecommendationsList,
    ActionsAccordion,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly apiService = inject(GoinsightApiService);
  readonly state = inject(InsightStateService);

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
