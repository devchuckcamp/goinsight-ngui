import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-recommendations-list',
  imports: [MatIconModule],
  templateUrl: './recommendations-list.html',
  styleUrl: './recommendations-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsList {
  readonly recommendations = input<string[]>([]);
}
