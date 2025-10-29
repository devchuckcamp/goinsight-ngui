import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-question-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="question-form">
      <mat-form-field style="width: 100%;">
        <mat-label>Ask a question about your feedback data</mat-label>
        <input matInput [(ngModel)]="question"
               placeholder="e.g., What are the top complaints from enterprise customers?"
               (keyup.enter)="onSubmit()">
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="!question.trim() || disabled" (click)="onSubmit()">
        <mat-icon>send</mat-icon>
        Ask
      </button>
    </div>
  `,
  styles: [`
    .question-form {
      margin-bottom: 24px;
    }
  `],
})
export class QuestionForm {
  question = '';
  disabled = false;
  @Output() submitQuestion = new EventEmitter<string>();

  onSubmit(): void {
    if (this.question.trim()) {
      this.submitQuestion.emit(this.question);
    }
  }
}
