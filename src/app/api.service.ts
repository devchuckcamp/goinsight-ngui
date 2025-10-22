import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AskResponse } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // TODO: move this to environment config
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<AskResponse> {
    return this.http.post<AskResponse>(`${this.baseUrl}/api/ask`, { question });
  }
}
