import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-recommendations-list',
  imports: [MatListModule, MatIconModule],
  templateUrl: './recommendations-list.html',
  styleUrl: './recommendations-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsList {
  @Input() recommendations: string[] = [];
}
