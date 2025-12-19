import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './api-error.interceptor';
import { ApiError } from '../../shared/models';

describe('apiErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass through successful responses', () => {
    httpClient.get('/test').subscribe((response) => {
      expect(response).toEqual({ data: 'ok' });
    });

    const req = httpMock.expectOne('/test');
    req.flush({ data: 'ok' });
  });

  it('should normalize server error with message', () => {
    httpClient.get('/test').subscribe({
      error: (err: ApiError) => {
        expect(err.message).toBe('Server error message');
        expect(err.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({ message: 'Server error message' }, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle network error (status 0)', () => {
    httpClient.get('/test').subscribe({
      error: (err: ApiError) => {
        expect(err.message).toBe('Unable to connect to the server. Please check your connection.');
      },
    });

    const req = httpMock.expectOne('/test');
    req.error(new ProgressEvent('error'));
  });
});
