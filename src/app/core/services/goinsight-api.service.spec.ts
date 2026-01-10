import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GoinsightApiService } from './goinsight-api.service';
import { AskResponse, CreateJiraTicketsResponse, CreateJiraTicketsRequest } from '../../shared/models';

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

    it('should handle null arrays in the response', () => {
      const mockResponse: AskResponse = {
        question: 'test',
        data_preview: null,
        summary: 'summary',
        recommendations: null,
        actions: null,
      };

      service.askQuestion('test').subscribe((response) => {
        expect(response.data_preview).toBeNull();
        expect(response.recommendations).toBeNull();
        expect(response.actions).toBeNull();
      });

      const req = httpMock.expectOne('/api/ask');
      req.flush(mockResponse);
    });

    it('should propagate HTTP errors', () => {
      service.askQuestion('test').subscribe({
        error: (err) => {
          expect(err.status).toBe(500);
        },
      });

      const req = httpMock.expectOne('/api/ask');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('createJiraTickets', () => {
    it('should POST to /api/jira-tickets with the full payload', () => {
      const payload: CreateJiraTicketsRequest = {
        question: 'test',
        data_preview: [],
        summary: 'summary',
        recommendations: [],
        actions: [{ title: 'Fix bug', description: 'Fix it' }],
        meta: { project_key: 'SASS' },
      };

      const mockResponse: CreateJiraTicketsResponse = {
        ticket_specs: [],
        created_tickets: [
          { action_title: 'Fix bug', ticket_key: 'SASS-1', ticket_url: 'https://jira.example.com/SASS-1' },
        ],
      };

      service.createJiraTickets(payload).subscribe((response) => {
        expect(response.created_tickets.length).toBe(1);
        expect(response.created_tickets[0].ticket_key).toBe('SASS-1');
      });

      const req = httpMock.expectOne('/api/jira-tickets');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.meta.project_key).toBe('SASS');
      expect(req.request.body.actions.length).toBe(1);
      req.flush(mockResponse);
    });

    it('should propagate HTTP errors', () => {
      const payload: CreateJiraTicketsRequest = {
        question: 'q',
        data_preview: [],
        summary: 's',
        recommendations: [],
        actions: [],
        meta: { project_key: 'SASS' },
      };

      service.createJiraTickets(payload).subscribe({
        error: (err) => {
          expect(err.status).toBe(400);
        },
      });

      const req = httpMock.expectOne('/api/jira-tickets');
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });
});
