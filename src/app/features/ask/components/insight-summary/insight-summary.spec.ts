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
    component.summary = 'This is a test summary';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('This is a test summary');
  });
});
