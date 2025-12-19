import { TestBed } from '@angular/core/testing';
import { InsightStateService } from './insight-state.service';
import { AskResponse } from '../../shared/models';

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
  });

  describe('setLoading', () => {
    it('should set loading and clear error', () => {
      service.setError({ message: 'test error' });
      service.setLoading(true);
      expect(service.loading()).toBeTrue();
      expect(service.error()).toBeNull();
    });
  });

  describe('setError', () => {
    it('should set error and clear loading', () => {
      service.setLoading(true);
      service.setError({ message: 'test error', status: 500 });
      expect(service.error()?.message).toBe('test error');
      expect(service.loading()).toBeFalse();
    });
  });

  describe('setInsightData', () => {
    it('should set question and response', () => {
      const response: AskResponse = {
        question: 'test',
        data_preview: [],
        summary: 'summary',
        recommendations: [],
        actions: [],
      };

      service.setInsightData('test', response);
      expect(service.currentQuestion()).toBe('test');
      expect(service.lastResponse()).toEqual(response);
      expect(service.hasResponse()).toBeTrue();
      expect(service.loading()).toBeFalse();
    });
  });

  describe('JIRA actions', () => {
    it('should toggle action selection', () => {
      service.toggleActionSelection(0);
      expect(service.selectedActionIndices()).toEqual([0]);
      expect(service.hasSelectedActions()).toBeTrue();

      service.toggleActionSelection(2);
      expect(service.selectedActionIndices()).toEqual([0, 2]);

      service.toggleActionSelection(0);
      expect(service.selectedActionIndices()).toEqual([2]);
    });

    it('should clear action selection', () => {
      service.toggleActionSelection(0);
      service.toggleActionSelection(1);
      service.clearActionSelection();
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.hasSelectedActions()).toBeFalse();
    });

    it('should set JIRA tickets created', () => {
      service.toggleActionSelection(0);
      const tickets = [{ action_title: 'test', ticket_key: 'SASS-1', ticket_url: 'url' }];
      service.setJiraTicketsCreated(tickets);
      expect(service.jiraTicketsCreated()).toEqual(tickets);
      expect(service.selectedActionIndices()).toEqual([]);
      expect(service.creatingJiraTickets()).toBeFalse();
    });
  });

  describe('reset', () => {
    it('should reset all state', () => {
      service.setInsightData('test', {
        question: 'test',
        data_preview: [],
        summary: 's',
        recommendations: [],
        actions: [],
      });
      service.toggleActionSelection(0);

      service.reset();

      expect(service.currentQuestion()).toBeNull();
      expect(service.lastResponse()).toBeNull();
      expect(service.loading()).toBeFalse();
      expect(service.error()).toBeNull();
      expect(service.selectedActionIndices()).toEqual([]);
    });
  });
});
