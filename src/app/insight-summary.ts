import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ti-insight-summary',
  imports: [MatCardModule],
  template: `
    <mat-card style="margin-bottom: 24px;">
      <mat-card-header>
        <mat-card-title>Summary</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ summary }}</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class InsightSummary {
  @Input() summary = '';
}
