import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AskRequest,
  AskResponse,
  CreateJiraTicketsRequest,
  CreateJiraTicketsResponse,
} from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class GoinsightApiService {
  private readonly http = inject(HttpClient);

  askQuestion(question: string): Observable<AskResponse> {
    const body: AskRequest = { question };
    return this.http.post<AskResponse>('/api/ask', body);
  }

  createJiraTickets(payload: CreateJiraTicketsRequest): Observable<CreateJiraTicketsResponse> {
    return this.http.post<CreateJiraTicketsResponse>('/api/jira-tickets', payload);
  }
}
