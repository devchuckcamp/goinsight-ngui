import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ti-insight-summary',
  imports: [MatCardModule],
  templateUrl: './insight-summary.html',
  styleUrl: './insight-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightSummary {
  @Input() summary = '';
}
