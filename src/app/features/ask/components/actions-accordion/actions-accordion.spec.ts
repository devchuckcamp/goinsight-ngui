import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionsAccordion } from './actions-accordion';

describe('ActionsAccordion', () => {
  let component: ActionsAccordion;
  let fixture: ComponentFixture<ActionsAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsAccordion],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsAccordion);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display action panels', () => {
    component.actions = [
      { title: 'Fix API latency', description: 'Optimize database queries' },
      { title: 'Add docs', description: 'Write better API docs' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fix API latency');
    expect(compiled.textContent).toContain('Add docs');
  });

  it('should toggle action selection', () => {
    component.toggleSelection(0);
    expect(component.isSelected(0)).toBeTrue();
    component.toggleSelection(0);
    expect(component.isSelected(0)).toBeFalse();
  });
});
