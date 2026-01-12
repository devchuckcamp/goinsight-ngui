import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionsAccordion } from './actions-accordion';
import { InsightStateService } from '../../../../core/services/insight-state.service';

describe('ActionsAccordion', () => {
  let component: ActionsAccordion;
  let fixture: ComponentFixture<ActionsAccordion>;
  let state: InsightStateService;
  let httpMock: HttpTestingController;

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
    state = TestBed.inject(InsightStateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to empty actions', () => {
    expect(component.actions()).toEqual([]);
  });

  it('should display action panels', () => {
    fixture.componentRef.setInput('actions', [
      { title: 'Fix API latency', description: 'Optimize database queries' },
      { title: 'Add docs', description: 'Write better API docs' },
    ]);
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

  it('should support selecting multiple actions', () => {
    component.toggleSelection(0);
    component.toggleSelection(2);
    expect(component.isSelected(0)).toBeTrue();
    expect(component.isSelected(1)).toBeFalse();
    expect(component.isSelected(2)).toBeTrue();
  });

  it('should display the actions count', () => {
    fixture.componentRef.setInput('actions', [
      { title: 'Action 1', description: 'Desc 1' },
      { title: 'Action 2', description: 'Desc 2' },
    ]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2 actions available');
  });

  it('should display selected count when actions are selected', () => {
    fixture.componentRef.setInput('actions', [
      { title: 'Action 1', description: 'Desc 1' },
      { title: 'Action 2', description: 'Desc 2' },
    ]);
    component.toggleSelection(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1 selected');
  });

  it('should not show JIRA button when nothing is selected', () => {
    fixture.componentRef.setInput('actions', [{ title: 'A', description: 'B' }]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.jira-btn')).toBeNull();
  });

  it('should show JIRA button when actions are selected', () => {
    fixture.componentRef.setInput('actions', [{ title: 'A', description: 'B' }]);
    component.toggleSelection(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.jira-btn')).toBeTruthy();
  });

  it('should not call API when no response or question exists', () => {
    component.createJiraTickets();
    httpMock.expectNone('/api/jira-tickets');
  });

  it('should call API when createJiraTickets is invoked with valid state', () => {
    state.setInsightData('test question', {
      question: 'test question',
      data_preview: [],
      summary: 'summary',
      recommendations: [],
      actions: [{ title: 'Fix it', description: 'Fix the bug' }],
    });
    state.toggleActionSelection(0);

    fixture.componentRef.setInput('actions', [{ title: 'Fix it', description: 'Fix the bug' }]);
    component.createJiraTickets();

    expect(state.creatingJiraTickets()).toBeTrue();

    const req = httpMock.expectOne('/api/jira-tickets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.question).toBe('test question');

    req.flush({
      ticket_specs: [],
      created_tickets: [{ action_title: 'Fix it', ticket_key: 'SASS-1', ticket_url: 'url' }],
    });

    expect(state.creatingJiraTickets()).toBeFalse();
    expect(state.jiraTicketsCreated().length).toBe(1);
  });

  it('should set JIRA error on API failure', () => {
    state.setInsightData('test', {
      question: 'test',
      data_preview: [],
      summary: 's',
      recommendations: [],
      actions: [{ title: 'A', description: 'B' }],
    });
    state.toggleActionSelection(0);

    fixture.componentRef.setInput('actions', [{ title: 'A', description: 'B' }]);
    component.createJiraTickets();

    const req = httpMock.expectOne('/api/jira-tickets');
    req.flush({ message: 'Failed' }, { status: 500, statusText: 'Error' });

    expect(state.creatingJiraTickets()).toBeFalse();
  });
});
