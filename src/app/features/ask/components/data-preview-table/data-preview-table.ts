import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FeedbackItem } from '../../../../shared/models';

@Component({
  selector: 'ti-data-preview-table',
  imports: [MatTableModule],
  templateUrl: './data-preview-table.html',
  styleUrl: './data-preview-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPreviewTable {
  @Input() data: FeedbackItem[] = [];
  displayedColumns = ['topic', 'sentiment', 'priority', 'source', 'summary'];
}
