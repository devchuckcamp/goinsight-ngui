import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayout } from './app-layout';

describe('AppLayout', () => {
  let component: AppLayout;
  let fixture: ComponentFixture<AppLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display GoInsight in the toolbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('GoInsight');
  });

  it('should display Feedback Copilot subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Feedback Copilot');
  });

  it('should display the footer with current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear().toString();
    expect(compiled.textContent).toContain(currentYear);
  });

  it('should set currentYear to the actual year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should have the app-shell structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-shell')).toBeTruthy();
    expect(compiled.querySelector('.app-content')).toBeTruthy();
    expect(compiled.querySelector('.app-footer')).toBeTruthy();
  });

  it('should project content into app-content', () => {
    expect(compiled().querySelector('main.app-content')).toBeTruthy();
  });

  function compiled(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }
});
