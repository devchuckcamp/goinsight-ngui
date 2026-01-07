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

  it('should define all display columns', () => {
    expect(component.displayedColumns).toEqual([
      'id', 'created_at', 'priority', 'sentiment', 'product_area',
      'topic', 'summary', 'customer_tier', 'source',
    ]);
  });

  it('should return correct sentiment class', () => {
    expect(component.getSentimentClass('negative')).toBe('badge badge--negative');
    expect(component.getSentimentClass('positive')).toBe('badge badge--positive');
    expect(component.getSentimentClass('neutral')).toBe('badge badge--neutral');
  });

  it('should return correct priority class', () => {
    expect(component.getPriorityClass(5)).toBe('badge badge--high');
    expect(component.getPriorityClass(4)).toBe('badge badge--high');
    expect(component.getPriorityClass(3)).toBe('badge badge--medium');
    expect(component.getPriorityClass(2)).toBe('badge badge--low');
  });

  it('should return correct tier class', () => {
    expect(component.getTierClass('enterprise')).toBe('badge badge--enterprise');
    expect(component.getTierClass('professional')).toBe('badge badge--professional');
    expect(component.getTierClass('starter')).toBe('badge badge--starter');
    expect(component.getTierClass('free')).toBe('badge badge--free');
  });

  it('should return correct source class', () => {
    expect(component.getSourceClass('zendesk')).toBe('badge badge--zendesk');
    expect(component.getSourceClass('slack')).toBe('badge badge--slack');
    expect(component.getSourceClass('email')).toBe('badge badge--email');
    expect(component.getSourceClass('survey')).toBe('badge badge--survey');
    expect(component.getSourceClass('unknown')).toBe('badge badge--other');
  });

  it('should show row count', () => {
    const mockData: FeedbackItem[] = [
      {
        id: '1', created_at: '2025-01-01', customer_tier: 'enterprise',
        priority: 5, product_area: 'api', region: 'NA', sentiment: 'negative',
        source: 'zendesk', summary: 'Issue 1', topic: 'Performance',
      },
      {
        id: '2', created_at: '2025-01-02', customer_tier: 'starter',
        priority: 2, product_area: 'billing', region: 'EU', sentiment: 'positive',
        source: 'email', summary: 'Issue 2', topic: 'Billing',
      },
    ];

    component.data = mockData;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2 rows');
  });
});
