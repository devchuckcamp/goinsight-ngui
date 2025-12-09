import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InsightStateService } from '../../../../core/services/insight-state.service';

@Component({
  selector: 'ti-question-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
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

  onSubmit(): void {
    if (this.form.valid) {
      const question = this.form.value.question?.trim();
      if (question) {
        this.submitQuestion.emit(question);
      }
    }
  }
}
