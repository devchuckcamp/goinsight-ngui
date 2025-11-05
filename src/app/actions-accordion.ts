import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Action } from './models';

@Component({
  selector: 'ti-actions-accordion',
  imports: [MatExpansionModule],
  template: `
    <div style="margin-bottom: 24px;">
      <h3>Recommended Actions</h3>
      <mat-accordion>
        @for (action of actions; track action.title) {
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>{{ action.title }}</mat-panel-title>
            </mat-expansion-panel-header>
            <p>{{ action.description }}</p>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </div>
  `,
})
export class ActionsAccordion {
  @Input() actions: Action[] = [];
}
