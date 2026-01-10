import { TestBed } from '@angular/core/testing';
import { InsightStateService } from './insight-state.service';
import { AskResponse } from '../../shared/models';

const mockResponse: AskResponse = {
  question: 'test',
  data_preview: [],
  summary: 'summary',
  recommendations: ['rec1'],
  actions: [
    { title: 'Action 1', description: 'Do something' },
    { title: 'Action 2', description: 'Do something else' },
  ],
};

describe('InsightStateService', () => {
  let service: InsightStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsightStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default state', () => {
    expect(service.currentQuestion()).toBeNull();
    expect(service.lastResponse()).toBeNull();
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeNull();
    expect(service.hasResponse()).toBeFalse();
    expect(service.selectedActionIndices()).toEqual([]);
    expect(service.creatingJiraTickets()).toBeFalse();
    expect(service.jiraTicketsCreated()).toEqual([]);
    expect(service.jiraError()).toBeNull();
    expect(service.hasSelectedActions()).toBeFalse();
  });

  describe('setLoading', () => {
    it('should set loading and clear error', () => {
      service.setError({ message: 'test error' });
      service.setLoading(true);
      expect(service.loading()).toBeTrue();
      expect(service.error()).toBeNull();
    });

    it('should allow setting loading to false', () => {
      service.setLoading(true);
      service.setLoading(false);
      expect(service.loading()).toBeFalse();
    });
  });

  describe('setError', () => {
    it('should set error and clear loading', () => {
      service.setLoading(true);
      service.setError({ message: 'test error', status: 500 });
      expect(service.error()?.message).toBe('test error');
      expect(service.error()?.status).toBe(500);
      expect(service.loading()).toBeFalse();
    });

    it('should accept null to clear error', () => {
      service.setError({ message: 'error' });
      service.setError(null);
      expect(service.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear the error signal', () => {
      service.setError({ message: 'error' });
      service.clearError();
      expect(service.error()).toBeNull();
    });
  });

  describe('setInsightData', () => {
    it('should set question and response', () => {
      service.setInsightData('test', mockResponse);
      expect(service.currentQuestion()).toBe('test');
      expect(service.lastResponse()).toEqual(mockResponse);
      expect(service.hasResponse()).toBeTrue();
      expect(service.loading()).toBeFalse();
      expect(service.error()).toBeNull();
    });

    it('should clear previous selections and tickets', () => {
      service.toggleActionSelection(0);
      service.setJiraTicketsCreated([{ action_title: 'a', ticket_key: 'K-1', ticket_url: 'url' }]);

      service.setInsightData('new question', mockResponse);
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.jiraTicketsCreated()).toEqual([]);
    });
  });

  describe('JIRA action selection', () => {
    it('should toggle action selection on', () => {
      service.toggleActionSelection(0);
      expect(service.selectedActionIndices()).toEqual([0]);
      expect(service.hasSelectedActions()).toBeTrue();
    });

    it('should toggle action selection off', () => {
      service.toggleActionSelection(0);
      service.toggleActionSelection(0);
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.hasSelectedActions()).toBeFalse();
    });

    it('should support multiple selections', () => {
      service.toggleActionSelection(0);
      service.toggleActionSelection(2);
      service.toggleActionSelection(5);
      expect(service.selectedActionIndices()).toEqual([0, 2, 5]);
    });

    it('should clear action selection', () => {
      service.toggleActionSelection(0);
      service.toggleActionSelection(1);
      service.clearActionSelection();
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.hasSelectedActions()).toBeFalse();
    });
  });

  describe('JIRA ticket creation state', () => {
    it('should set creating state and clear JIRA error', () => {
      service.setJiraError({ message: 'failed' });
      service.setCreatingJiraTickets(true);
      expect(service.creatingJiraTickets()).toBeTrue();
      expect(service.jiraError()).toBeNull();
    });

    it('should set JIRA tickets created and clear selections', () => {
      service.toggleActionSelection(0);
      service.setCreatingJiraTickets(true);

      const tickets = [{ action_title: 'test', ticket_key: 'SASS-1', ticket_url: 'url' }];
      service.setJiraTicketsCreated(tickets);

      expect(service.jiraTicketsCreated()).toEqual(tickets);
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.creatingJiraTickets()).toBeFalse();
      expect(service.jiraError()).toBeNull();
    });

    it('should set JIRA error and stop creating', () => {
      service.setCreatingJiraTickets(true);
      service.setJiraError({ message: 'JIRA failed', status: 500 });
      expect(service.jiraError()?.message).toBe('JIRA failed');
      expect(service.creatingJiraTickets()).toBeFalse();
    });

    it('should clear JIRA error', () => {
      service.setJiraError({ message: 'err' });
      service.clearJiraError();
      expect(service.jiraError()).toBeNull();
    });

    it('should clear JIRA tickets', () => {
      service.setJiraTicketsCreated([{ action_title: 'a', ticket_key: 'K-1', ticket_url: 'url' }]);
      service.clearJiraTickets();
      expect(service.jiraTicketsCreated()).toEqual([]);
    });
  });

  describe('removeCreatedActions', () => {
    it('should remove actions by index from the response', () => {
      service.setInsightData('test', mockResponse);
      service.removeCreatedActions([0]);
      const updated = service.lastResponse();
      expect(updated?.actions?.length).toBe(1);
      expect(updated?.actions?.[0].title).toBe('Action 2');
    });

    it('should handle removing multiple indices', () => {
      service.setInsightData('test', mockResponse);
      service.removeCreatedActions([0, 1]);
      expect(service.lastResponse()?.actions?.length).toBe(0);
    });

    it('should do nothing when no response exists', () => {
      service.removeCreatedActions([0]);
      expect(service.lastResponse()).toBeNull();
    });

    it('should handle null actions in response', () => {
      const responseWithNullActions: AskResponse = { ...mockResponse, actions: null };
      service.setInsightData('test', responseWithNullActions);
      service.removeCreatedActions([0]);
      expect(service.lastResponse()?.actions?.length).toBe(0);
    });
  });

  describe('reset', () => {
    it('should reset all state to defaults', () => {
      service.setInsightData('test', mockResponse);
      service.toggleActionSelection(0);
      service.setCreatingJiraTickets(true);
      service.setJiraError({ message: 'err' });

      service.reset();

      expect(service.currentQuestion()).toBeNull();
      expect(service.lastResponse()).toBeNull();
      expect(service.loading()).toBeFalse();
      expect(service.error()).toBeNull();
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.creatingJiraTickets()).toBeFalse();
      expect(service.jiraTicketsCreated()).toEqual([]);
      expect(service.jiraError()).toBeNull();
    });
  });
});
