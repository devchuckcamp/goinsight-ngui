import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsList } from './recommendations-list';

describe('RecommendationsList', () => {
  let component: RecommendationsList;
  let fixture: ComponentFixture<RecommendationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsList],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to empty recommendations', () => {
    expect(component.recommendations()).toEqual([]);
  });

  it('should display recommendation items', () => {
    fixture.componentRef.setInput('recommendations', ['Improve API response time', 'Add better documentation']);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Improve API response time');
    expect(compiled.textContent).toContain('Add better documentation');
  });

  it('should render a check icon for each recommendation', () => {
    fixture.componentRef.setInput('recommendations', ['Rec 1', 'Rec 2', 'Rec 3']);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const checkIcons = compiled.querySelectorAll('.check-icon');
    expect(checkIcons.length).toBe(3);
  });

  it('should display the header with lightbulb icon', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Recommendations');
    expect(compiled.querySelector('.header-icon')).toBeTruthy();
  });

  it('should render no items when recommendations is empty', () => {
    fixture.componentRef.setInput('recommendations', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.recommendation-item').length).toBe(0);
  });
});
