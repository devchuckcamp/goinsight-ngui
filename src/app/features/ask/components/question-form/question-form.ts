import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { InsightStateService } from '../../../../core/services/insight-state.service';

@Component({
  selector: 'ti-question-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionForm {
  private readonly fb = inject(FormBuilder);
  private readonly state = inject(InsightStateService);

  @Output() submitQuestion = new EventEmitter<string>();

  readonly form = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(3)]],
  });

  readonly loading = this.state.loading;

  readonly suggestions = [
    'Show me critical issues from enterprise customers',
    'What are the top billing problems this month?',
    'Show negative feedback about API performance',
    'List high priority issues from North America',
  ];

  useSuggestion(suggestion: string): void {
    this.form.controls['question'].setValue(suggestion);
    this.submitQuestion.emit(suggestion);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const question = this.form.value.question?.trim();
      if (question) {
        this.submitQuestion.emit(question);
      }
    }
  }
}
