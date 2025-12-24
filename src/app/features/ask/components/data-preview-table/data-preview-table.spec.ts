import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataPreviewTable } from './data-preview-table';
import { FeedbackItem } from '../../../../shared/models';

describe('DataPreviewTable', () => {
  let component: DataPreviewTable;
  let fixture: ComponentFixture<DataPreviewTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPreviewTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPreviewTable);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table with data', () => {
    const mockData: FeedbackItem[] = [
      {
        id: '1',
        created_at: '2025-01-01',
        customer_tier: 'enterprise',
        priority: 5,
        product_area: 'api',
        region: 'NA',
        sentiment: 'negative',
        source: 'zendesk',
        summary: 'API is slow',
        topic: 'Performance',
      },
    ];

    component.data = mockData;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
    expect(compiled.textContent).toContain('Performance');
  });

  it('should define correct display columns', () => {
    expect(component.displayedColumns).toEqual(['topic', 'sentiment', 'priority', 'source', 'summary']);
  });
});
