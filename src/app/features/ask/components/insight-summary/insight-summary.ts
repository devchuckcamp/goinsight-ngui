import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-insight-summary',
  imports: [MatIconModule],
  templateUrl: './insight-summary.html',
  styleUrl: './insight-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightSummary {
  @Input() summary = '';
  @Input() question = '';
}
