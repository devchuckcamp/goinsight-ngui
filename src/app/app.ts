import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { ApiService } from './api.service';
import { InsightStateService } from './insight-state.service';
import { AskResponse } from './models';
import { QuestionForm } from './question-form';
import { InsightSummary } from './insight-summary';
import { DataPreviewTable } from './data-preview-table';
import { RecommendationsList } from './recommendations-list';
import { ActionsAccordion } from './actions-accordion';

@Component({
  selector: 'ti-root',
  imports: [
    AsyncPipe,
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
  title = 'TensInsight';
  currentYear = new Date().getFullYear();

  constructor(
    private apiService: ApiService,
    public state: InsightStateService,
  ) {}

  onAskQuestion(question: string): void {
    this.state.setLoading(true);

    this.apiService.askQuestion(question).subscribe({
      next: (data) => {
        this.state.setInsightData(question, data);
      },
      error: (err) => {
        this.state.setError(err.message || 'Something went wrong');
      },
    });
  }
}
