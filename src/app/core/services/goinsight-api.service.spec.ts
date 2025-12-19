import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GoinsightApiService } from './goinsight-api.service';
import { AskResponse, CreateJiraTicketsResponse } from '../../shared/models';

describe('GoinsightApiService', () => {
  let service: GoinsightApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GoinsightApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('askQuestion', () => {
    it('should POST to /api/ask with the question', () => {
      const mockResponse: AskResponse = {
        question: 'test question',
        data_preview: [],
        summary: 'Test summary',
        recommendations: ['rec1'],
        actions: [],
      };

      service.askQuestion('test question').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/ask');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ question: 'test question' });
      req.flush(mockResponse);
    });
  });

  describe('createJiraTickets', () => {
    it('should POST to /api/jira-tickets with the payload', () => {
      const mockResponse: CreateJiraTicketsResponse = {
        ticket_specs: [],
        created_tickets: [
          { action_title: 'Fix bug', ticket_key: 'SASS-1', ticket_url: 'https://jira.example.com/SASS-1' },
        ],
      };

      const payload = {
        question: 'test',
        data_preview: [],
        summary: 'summary',
        recommendations: [],
        actions: [{ title: 'Fix bug', description: 'Fix it' }],
        meta: { project_key: 'SASS' },
      };

      service.createJiraTickets(payload).subscribe((response) => {
        expect(response.created_tickets.length).toBe(1);
      });

      const req = httpMock.expectOne('/api/jira-tickets');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
