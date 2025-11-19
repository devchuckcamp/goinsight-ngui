import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Action } from '../../../../shared/models';

@Component({
  selector: 'ti-actions-accordion',
  imports: [MatExpansionModule],
  templateUrl: './actions-accordion.html',
  styleUrl: './actions-accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsAccordion {
  @Input() actions: Action[] = [];
}
