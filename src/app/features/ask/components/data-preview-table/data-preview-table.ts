import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackItem } from '../../../../shared/models';

@Component({
  selector: 'ti-data-preview-table',
  imports: [DatePipe, MatTableModule, MatIconModule],
  templateUrl: './data-preview-table.html',
  styleUrl: './data-preview-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPreviewTable {
  @Input() data: FeedbackItem[] = [];

  displayedColumns = [
    'id', 'created_at', 'priority', 'sentiment', 'product_area',
    'topic', 'summary', 'customer_tier', 'source',
  ];

  getSentimentClass(sentiment: string): string {
    switch (sentiment) {
      case 'negative': return 'badge badge--negative';
      case 'positive': return 'badge badge--positive';
      default: return 'badge badge--neutral';
    }
  }

  getPriorityClass(priority: number): string {
    if (priority >= 4) return 'badge badge--high';
    if (priority >= 3) return 'badge badge--medium';
    return 'badge badge--low';
  }

  getTierClass(tier: string): string {
    switch (tier) {
      case 'enterprise': return 'badge badge--enterprise';
      case 'professional': return 'badge badge--professional';
      case 'starter': return 'badge badge--starter';
      default: return 'badge badge--free';
    }
  }

  getSourceClass(source: string): string {
    switch (source) {
      case 'zendesk': return 'badge badge--zendesk';
      case 'slack': return 'badge badge--slack';
      case 'email': return 'badge badge--email';
      case 'survey': return 'badge badge--survey';
      default: return 'badge badge--other';
    }
  }
}
