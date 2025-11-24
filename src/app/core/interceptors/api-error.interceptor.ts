import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../../shared/models';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';

      if (error.error?.message) {
        message = error.error.message;
      } else if (error.error?.error) {
        message = error.error.error;
      } else if (error.status === 0) {
        message = 'Unable to connect to the server. Please check your connection.';
      } else if (error.statusText) {
        message = error.statusText;
      }

      const apiError: ApiError = {
        message,
        status: error.status || undefined,
      };

      return throwError(() => apiError);
    })
  );
};
