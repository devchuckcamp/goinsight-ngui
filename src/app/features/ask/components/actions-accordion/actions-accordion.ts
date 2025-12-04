import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, CreateJiraTicketsRequest } from '../../../../shared/models';
import { InsightStateService } from '../../../../core/services/insight-state.service';
import { GoinsightApiService } from '../../../../core/services/goinsight-api.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ti-actions-accordion',
  imports: [MatExpansionModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './actions-accordion.html',
  styleUrl: './actions-accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsAccordion {
  @Input() actions: Action[] = [];

  private readonly state = inject(InsightStateService);
  private readonly apiService = inject(GoinsightApiService);
  private readonly snackBar = inject(MatSnackBar);

  readonly selectedIndices = this.state.selectedActionIndices;
  readonly creating = this.state.creatingJiraTickets;

  isSelected(index: number): boolean {
    return this.selectedIndices().includes(index);
  }

  toggleSelection(index: number): void {
    this.state.toggleActionSelection(index);
  }

  createJiraTickets(): void {
    const response = this.state.lastResponse();
    const question = this.state.currentQuestion();
    if (!response || !question) return;

    const selectedActions = this.selectedIndices().map((i) => response.actions[i]);

    const payload: CreateJiraTicketsRequest = {
      question,
      data_preview: response.data_preview,
      summary: response.summary,
      recommendations: response.recommendations,
      actions: selectedActions,
      meta: { project_key: environment.jiraProjectKey },
    };

    this.state.setCreatingJiraTickets(true);

    this.apiService.createJiraTickets(payload).subscribe({
      next: (result) => {
        this.state.setJiraTicketsCreated(result.created_tickets);
        this.snackBar.open(
          `Created ${result.created_tickets.length} JIRA ticket(s)`,
          'Dismiss',
          { duration: 5000 }
        );
      },
      error: (err) => {
        this.state.setJiraError(err);
      },
    });
  }
}
