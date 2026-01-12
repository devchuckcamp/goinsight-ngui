import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightSummary } from './insight-summary';

describe('InsightSummary', () => {
  let component: InsightSummary;
  let fixture: ComponentFixture<InsightSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(InsightSummary);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the summary text', () => {
    fixture.componentRef.setInput('summary', 'This is a test summary');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('This is a test summary');
  });

  it('should display the question when provided', () => {
    fixture.componentRef.setInput('question', 'What are the top issues?');
    fixture.componentRef.setInput('summary', 'Here are the findings');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('What are the top issues?');
  });

  it('should not show question section when empty', () => {
    fixture.componentRef.setInput('summary', 'Summary text');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.question-display')).toBeNull();
  });
});
