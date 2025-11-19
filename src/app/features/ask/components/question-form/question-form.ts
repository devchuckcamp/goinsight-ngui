import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-question-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionForm {
  question = '';
  @Output() submitQuestion = new EventEmitter<string>();

  onSubmit(): void {
    if (this.question.trim()) {
      this.submitQuestion.emit(this.question);
    }
  }
}
