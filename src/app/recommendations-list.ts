import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-recommendations-list',
  imports: [MatListModule, MatIconModule],
  template: `
    <div style="margin-bottom: 24px;">
      <h3>Recommendations</h3>
      <mat-list>
        @for (rec of recommendations; track rec) {
          <mat-list-item>
            <mat-icon matListItemIcon>lightbulb</mat-icon>
            <span matListItemTitle>{{ rec }}</span>
          </mat-list-item>
        }
      </mat-list>
    </div>
  `,
})
export class RecommendationsList {
  @Input() recommendations: string[] = [];
}
