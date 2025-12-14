import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-insight-summary',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './insight-summary.html',
  styleUrl: './insight-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightSummary {
  @Input() summary = '';
}
