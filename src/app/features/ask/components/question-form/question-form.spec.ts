import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionForm } from './question-form';

describe('QuestionForm', () => {
  let component: QuestionForm;
  let fixture: ComponentFixture<QuestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionForm],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form by default', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should emit submitQuestion when form is valid', () => {
    spyOn(component.submitQuestion, 'emit');
    component.form.controls['question'].setValue('What are the top issues?');
    component.onSubmit();
    expect(component.submitQuestion.emit).toHaveBeenCalledWith('What are the top issues?');
  });

  it('should not emit when form is invalid', () => {
    spyOn(component.submitQuestion, 'emit');
    component.form.controls['question'].setValue('');
    component.onSubmit();
    expect(component.submitQuestion.emit).not.toHaveBeenCalled();
  });

  it('should require minimum 3 characters', () => {
    component.form.controls['question'].setValue('ab');
    expect(component.form.valid).toBeFalse();
    component.form.controls['question'].setValue('abc');
    expect(component.form.valid).toBeTrue();
  });

  it('should have suggestion chips', () => {
    expect(component.suggestions.length).toBe(4);
    expect(component.suggestions[0]).toContain('enterprise');
  });

  it('should emit question when using suggestion', () => {
    spyOn(component.submitQuestion, 'emit');
    const suggestion = component.suggestions[0];
    component.useSuggestion(suggestion);
    expect(component.submitQuestion.emit).toHaveBeenCalledWith(suggestion);
    expect(component.form.controls['question'].value).toBe(suggestion);
  });
});
