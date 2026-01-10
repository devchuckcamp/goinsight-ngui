import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { App } from './app';
import { InsightStateService } from './core/services/insight-state.service';

describe('App', () => {
  let httpMock: HttpTestingController;
  let state: InsightStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    state = TestBed.inject(InsightStateService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the layout shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ti-app-layout')).toBeTruthy();
  });

  it('should render the question form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ti-question-form')).toBeTruthy();
  });

  it('should show empty state when no response', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  it('should not show empty state when loading', () => {
    state.setLoading(true);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeNull();
  });

  it('should show loading spinner when loading', () => {
    state.setLoading(true);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
  });

  it('should show error banner when error is set', () => {
    state.setError({ message: 'Something went wrong' });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-banner')).toBeTruthy();
    expect(compiled.textContent).toContain('Something went wrong');
  });

  it('should call API and set state on onAskQuestion', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.onAskQuestion('test question');

    expect(state.loading()).toBeTrue();

    const req = httpMock.expectOne('/api/ask');
    expect(req.request.method).toBe('POST');
    req.flush({
      question: 'test question',
      data_preview: null,
      summary: 'Test summary',
      recommendations: null,
      actions: null,
    });

    expect(state.loading()).toBeFalse();
    expect(state.currentQuestion()).toBe('test question');
    expect(state.lastResponse()?.summary).toBe('Test summary');
  });

  it('should set error state on API failure', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.onAskQuestion('test');

    const req = httpMock.expectOne('/api/ask');
    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });

    expect(state.loading()).toBeFalse();
    expect(state.error()).toBeTruthy();
  });

  it('should render insight summary when response exists', () => {
    state.setInsightData('test', {
      question: 'test',
      data_preview: null,
      summary: 'AI analysis results',
      recommendations: null,
      actions: null,
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ti-insight-summary')).toBeTruthy();
    expect(compiled.querySelector('.empty-state')).toBeNull();
  });
});
