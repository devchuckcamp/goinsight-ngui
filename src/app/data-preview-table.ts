import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FeedbackItem } from './models';

@Component({
  selector: 'ti-data-preview-table',
  imports: [MatTableModule],
  template: `
    <div style="margin-bottom: 24px;">
      <h3>Data Preview</h3>
      <div style="overflow-x: auto;">
        <table mat-table [dataSource]="data" style="width: 100%;">
          <ng-container matColumnDef="topic">
            <th mat-header-cell *matHeaderCellDef>Topic</th>
            <td mat-cell *matCellDef="let item">{{ item.topic }}</td>
          </ng-container>
          <ng-container matColumnDef="sentiment">
            <th mat-header-cell *matHeaderCellDef>Sentiment</th>
            <td mat-cell *matCellDef="let item">{{ item.sentiment }}</td>
          </ng-container>
          <ng-container matColumnDef="priority">
            <th mat-header-cell *matHeaderCellDef>Priority</th>
            <td mat-cell *matCellDef="let item">{{ item.priority }}</td>
          </ng-container>
          <ng-container matColumnDef="source">
            <th mat-header-cell *matHeaderCellDef>Source</th>
            <td mat-cell *matCellDef="let item">{{ item.source }}</td>
          </ng-container>
          <ng-container matColumnDef="summary">
            <th mat-header-cell *matHeaderCellDef>Summary</th>
            <td mat-cell *matCellDef="let item">{{ item.summary }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
})
export class DataPreviewTable {
  @Input() data: FeedbackItem[] = [];
  displayedColumns = ['topic', 'sentiment', 'priority', 'source', 'summary'];
}
