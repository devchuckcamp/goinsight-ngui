import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from './api.service';
import { AskResponse } from './models';
import { QuestionForm } from './question-form';
import { InsightSummary } from './insight-summary';

@Component({
  selector: 'ti-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    QuestionForm,
    InsightSummary,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'TensInsight';
  currentYear = new Date().getFullYear();
  response: AskResponse | null = null;
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  onAskQuestion(question: string): void {
    this.loading = true;
    this.error = '';
    this.response = null;

    this.apiService.askQuestion(question).subscribe({
      next: (data) => {
        this.response = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Something went wrong';
        this.loading = false;
      },
    });
  }
}
