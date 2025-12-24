import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionForm } from './question-form';

describe('QuestionForm', () => {
  let component: QuestionForm;
  let fixture: ComponentFixture<QuestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionForm],
      providers: [provideAnimationsAsync()],
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
});
