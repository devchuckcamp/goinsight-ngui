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

  it('should display recommendation items', () => {
    component.recommendations = ['Improve API response time', 'Add better documentation'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Improve API response time');
    expect(compiled.textContent).toContain('Add better documentation');
  });
});
