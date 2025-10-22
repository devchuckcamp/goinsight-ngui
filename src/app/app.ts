import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from './api.service';
import { AskResponse } from './models';

@Component({
  selector: 'ti-root',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'TensInsight';
  currentYear = new Date().getFullYear();
  question = '';
  response: AskResponse | null = null;
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  askQuestion(): void {
    if (!this.question.trim()) return;
    this.loading = true;
    this.error = '';
    this.response = null;

    this.apiService.askQuestion(this.question).subscribe({
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
